<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Technology;

class TechnologySeeder extends Seeder
{
    public function run(): void
    {
        $technologies = [
            // Языки программирования
            ['name' => 'PHP', 'group' => 'Языки', 'synonyms' => ['php', 'php7', 'php8', 'php8.1', 'php8.2']],
            ['name' => 'Python', 'group' => 'Языки', 'synonyms' => ['python', 'py']],
            ['name' => 'JavaScript', 'group' => 'Языки', 'synonyms' => ['js', 'javascript', 'ecmascript']],
            ['name' => 'TypeScript', 'group' => 'Языки', 'synonyms' => ['ts', 'typescript']],
            ['name' => 'Golang', 'group' => 'Языки', 'synonyms' => ['go', 'golang']],
            ['name' => 'Node.js', 'group' => 'Языки', 'synonyms' => ['node', 'nodejs', 'node.js']],

            // Фреймворки (Backend)
            ['name' => 'Laravel', 'group' => 'Фреймворки', 'synonyms' => ['laravel', 'lrv', 'laravel 10', 'laravel 11', 'laravel 12']],
            ['name' => 'Symfony', 'group' => 'Фреймворки', 'synonyms' => ['symfony', 'sf']],
            ['name' => 'Yii2', 'group' => 'Фреймворки', 'synonyms' => ['yii', 'yii2']],
            ['name' => 'FastAPI', 'group' => 'Фреймворки', 'synonyms' => ['fastapi']],
            ['name' => 'Express', 'group' => 'Фреймворки', 'synonyms' => ['express', 'expressjs']],

            // Фреймворки (Frontend)
            ['name' => 'React', 'group' => 'Фреймворки', 'synonyms' => ['react', 'reactjs', 'react.js']],
            ['name' => 'Vue', 'group' => 'Фреймворки', 'synonyms' => ['vue', 'vuejs', 'vue.js']],
            ['name' => 'Blade', 'group' => 'Фреймворки', 'synonyms' => ['blade']],
            ['name' => 'Twig', 'group' => 'Фреймворки', 'synonyms' => ['twig']],
            ['name' => 'Filament', 'group' => 'Фреймворки', 'synonyms' => ['filament']],

            // Базы данных
            ['name' => 'PostgreSQL', 'group' => 'Базы данных', 'synonyms' => ['postgres', 'postgre', 'pgsql']],
            ['name' => 'MySQL', 'group' => 'Базы данных', 'synonyms' => ['mysql', 'mariadb']],
            ['name' => 'MongoDB', 'group' => 'Базы данных', 'synonyms' => ['mongo', 'mongodb']],
            ['name' => 'Redis', 'group' => 'Базы данных', 'synonyms' => ['redis']],
            ['name' => 'ClickHouse', 'group' => 'Базы данных', 'synonyms' => ['clickhouse']],
            ['name' => 'Cassandra', 'group' => 'Базы данных', 'synonyms' => ['cassandra']],
            ['name' => 'Elasticsearch', 'group' => 'Базы данных', 'synonyms' => ['elastic', 'elasticsearch']],

            // DevOps и инфраструктура
            ['name' => 'Docker', 'group' => 'DevOps', 'synonyms' => ['docker', 'docker-compose']],
            ['name' => 'Kubernetes', 'group' => 'DevOps', 'synonyms' => ['k8s', 'kubernetes']],
            ['name' => 'GitLab CI', 'group' => 'DevOps', 'synonyms' => ['gitlab ci', 'gitlab-ci']],
            ['name' => 'GitHub Actions', 'group' => 'DevOps', 'synonyms' => ['github actions', 'gh actions']],
            ['name' => 'Nginx', 'group' => 'DevOps', 'synonyms' => ['nginx']],
            ['name' => 'Certbot', 'group' => 'DevOps', 'synonyms' => ['certbot']],
            ['name' => 'Linux', 'group' => 'DevOps', 'synonyms' => ['linux', 'ubuntu', 'centos']],

            // API и протоколы
            ['name' => 'REST API', 'group' => 'API', 'synonyms' => ['rest', 'restful', 'rest api']],
            ['name' => 'GraphQL', 'group' => 'API', 'synonyms' => ['graphql']],
            ['name' => 'WebSocket', 'group' => 'API', 'synonyms' => ['websocket', 'ws']],
            ['name' => 'gRPC', 'group' => 'API', 'synonyms' => ['grpc']],

            // Брокеры сообщений
            ['name' => 'Kafka', 'group' => 'Брокеры', 'synonyms' => ['kafka']],
            ['name' => 'RabbitMQ', 'group' => 'Брокеры', 'synonyms' => ['rabbit', 'rabbitmq']],

            // Оркестрация и CI/CD
            ['name' => 'CI/CD', 'group' => 'DevOps', 'synonyms' => ['ci/cd', 'ci', 'cd']],
        ];

        foreach ($technologies as $tech) {
            Technology::create([
                'name' => $tech['name'],
                'group' => $tech['group'],
                'synonyms' => $tech['synonyms'],
            ]);
        }
    }
}