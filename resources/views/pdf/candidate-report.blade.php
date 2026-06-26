<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Отчёт по кандидату</title>
    <style>
        body {
            font-family: 'DejaVu Sans', 'Arial', sans-serif;
            font-size: 14px;
            color: #333;
        }
        .header {
            text-align: center;
            border-bottom: 2px solid #000;
            padding-bottom: 10px;
        }
        .section {
            margin: 20px 0;
        }
        .section-title {
            font-size: 16px;
            font-weight: bold;
            border-bottom: 1px solid #ccc;
            padding-bottom: 5px;
        }
        .badge {
            display: inline-block;
            padding: 3px 10px;
            border-radius: 4px;
            font-weight: bold;
        }
        .badge-green {
            background: #d4edda;
            color: #155724;
        }
        .badge-red {
            background: #f8d7da;
            color: #721c24;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background: #f2f2f2;
        }
        .score-box {
            display: inline-block;
            padding: 10px 20px;
            border-radius: 8px;
            font-size: 24px;
            font-weight: bold;
        }
        .score-green {
            background: #d4edda;
            color: #155724;
        }
        .score-yellow {
            background: #fff3cd;
            color: #856404;
        }
        .score-red {
            background: #f8d7da;
            color: #721c24;
        }
        .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 12px;
            color: #999;
            border-top: 1px solid #ddd;
            padding-top: 10px;
        }
        ul {
            padding-left: 20px;
        }
        li {
            margin-bottom: 4px;
        }
    </style>
</head>
<body>

    <div class="header">
        <h1>Отчёт по кандидату</h1>
        <p><strong>Дата:</strong> {{ now()->format('d.m.Y H:i') }}</p>
    </div>

    <div class="section">
        <div class="section-title">Информация о кандидате</div>
        <table>
            <tr>
                <td><strong>Кандидат:</strong></td>
                <td>{{ $candidate->name ?? 'Не указан' }}</td>
            </tr>
            <tr>
                <td><strong>Запрос:</strong></td>
                <td>{{ $candidate->request->position ?? 'Не указан' }}</td>
            </tr>
            <tr>
                <td><strong>Грейд в запросе:</strong></td>
                <td>{{ $candidate->request->grade ?? 'Не указан' }}</td>
            </tr>
            <tr>
                <td><strong>Локация:</strong></td>
                <td>{{ $candidate->request->location ?? 'Не указана' }}</td>
            </tr>
            <tr>
                <td><strong>Статус:</strong></td>
                <td>{{ $candidate->status }}</td>
            </tr>
        </table>
    </div>

    <div class="section">
        <div class="section-title">Результат сверки</div>

        @if($candidate->assessment)
            @php
                $total = $candidate->assessment->total_score ?? 0;
                $scoreClass = $total >= 80 ? 'score-green' : ($total >= 50 ? 'score-yellow' : 'score-red');
            @endphp

            <div style="text-align: center; margin: 20px 0;">
                <span class="score-box {{ $scoreClass }}">
                    {{ $total }}%
                </span>
                <p style="margin-top: 5px;">Общий процент покрытия</p>
            </div>

            <table>
                <tr>
                    <td><strong>Must have:</strong></td>
                    <td>{{ $candidate->assessment->must_have_score ?? 0 }}%</td>
                    <td>
                        @if($candidate->assessment->is_fully_matched)
                            <span class="badge badge-green">✅ Все закрыты</span>
                        @else
                            <span class="badge badge-red">❌ Есть пропуски</span>
                        @endif
                    </td>
                </tr>
                <tr>
                    <td><strong>Nice to have:</strong></td>
                    <td>{{ $candidate->assessment->nice_to_have_score ?? 0 }}%</td>
                    <td>
                        @if(($candidate->assessment->nice_to_have_score ?? 0) >= 100)
                            <span class="badge badge-green">✅ Все закрыты</span>
                        @else
                            <span class="badge badge-yellow">⚠️ Частично</span>
                        @endif
                    </td>
                </tr>
            </table>

            <div style="margin-top: 20px;">
                <h4>Закрытые требования ({{ count($candidate->assessment->matched_requirements ?? []) }})</h4>
                <ul>
                    @foreach($candidate->assessment->matched_requirements ?? [] as $req)
                        <li>✅ {{ $req['technology_name'] }} ({{ $req['type'] }}) — вес {{ $req['weight'] }}</li>
                    @endforeach
                </ul>

                <h4>Отсутствующие требования ({{ count($candidate->assessment->missing_requirements ?? []) }})</h4>
                <ul>
                    @foreach($candidate->assessment->missing_requirements ?? [] as $req)
                        <li>❌ {{ $req['technology_name'] }} ({{ $req['type'] }}) — вес {{ $req['weight'] }}</li>
                    @endforeach
                </ul>
            </div>
        @else
            <p>Сверка не выполнена</p>
        @endif
    </div>

    <div class="section">
        <div class="section-title">Найденные навыки</div>
        <ul>
            @foreach($candidate->candidateSkills as $skill)
                <li>✅ {{ $skill->technology->name ?? 'Неизвестно' }}</li>
            @endforeach
        </ul>
    </div>

    <div class="footer">
        Отчёт сгенерирован системой TrueMachine
    </div>

</body>
</html>