<?php

namespace App\Services;

use App\Models\Request;
use App\Models\Candidate;
use App\Models\Assessment;

class MatchService
{
    public function calculate($requestId, $candidateId)
    {
        $request = Request::with('requirements.technology')->findOrFail($requestId);
        $candidate = Candidate::with('candidateSkills.technology')->findOrFail($candidateId);

        $matched = [];
        $missing = [];
        $totalWeight = 0;
        $matchedWeight = 0;

        $candidateTechIds = $candidate->candidateSkills->pluck('technology_id')->toArray();

        foreach ($request->requirements as $requirement) {
            $techId = $requirement->technology_id;
            $weight = $requirement->weight ?? 1;
            $totalWeight += $weight;

            if (in_array($techId, $candidateTechIds)) {
                $matched[] = [
                    'requirement_id' => $requirement->id,
                    'technology_name' => $requirement->technology->name ?? 'Неизвестно',
                    'type' => $requirement->type,
                    'weight' => $weight,
                ];
                $matchedWeight += $weight;
            } else {
                $missing[] = [
                    'requirement_id' => $requirement->id,
                    'technology_name' => $requirement->technology->name ?? 'Неизвестно',
                    'type' => $requirement->type,
                    'weight' => $weight,
                ];
            }
        }

        $mustHaveMissing = collect($missing)->filter(fn($m) => $m['type'] === 'must_have')->count();
        $isFullyMatched = $mustHaveMissing === 0;

        $totalScore = $totalWeight > 0 ? round(($matchedWeight / $totalWeight) * 100, 2) : 0;

        $mustTotal = $request->requirements->where('type', 'must_have')->sum('weight');
        $mustMatched = collect($matched)->filter(fn($m) => $m['type'] === 'must_have')->sum('weight');
        $mustScore = $mustTotal > 0 ? round(($mustMatched / $mustTotal) * 100, 2) : 0;

        $niceTotal = $request->requirements->where('type', 'nice_to_have')->sum('weight');
        $niceMatched = collect($matched)->filter(fn($m) => $m['type'] === 'nice_to_have')->sum('weight');
        $niceScore = $niceTotal > 0 ? round(($niceMatched / $niceTotal) * 100, 2) : 0;

        $assessment = Assessment::updateOrCreate(
            ['request_id' => $requestId, 'candidate_id' => $candidateId],
            [
                'must_have_score' => $mustScore,
                'nice_to_have_score' => $niceScore,
                'total_score' => $totalScore,
                'matched_requirements' => $matched,
                'missing_requirements' => $missing,
                'is_fully_matched' => $isFullyMatched,
            ]
        );

        $candidate->update([
            'match_score' => $totalScore,
            'status' => 'matched',
        ]);

        return $assessment;
    }
}