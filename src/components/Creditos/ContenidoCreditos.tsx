import { Center } from '@mantine/core';

import { Grid } from '@mantine/core';

import { Avatar, Text, Button, Paper } from '@mantine/core';

export function CreditosComponent() {

    const handleGithubClick = (url: any) => {
        window.open(url, "_blank");
    };

    return (
        <Center h={1000} bg="var(--mantine-color-gray-light)">

            <Grid gutter="lg" style={{ maxWidth: "60%", minWidth: "60%" }}>
                <Grid.Col span={4}>
                    <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
                        <Avatar
                            src="https://avatars.githubusercontent.com/u/70614527?v=4"
                            size={120}
                            radius={120}
                            mx="auto"
                        />
                        <Text ta="center" fz="lg" fw={500} mt="md">
                            Andres Hernandez Guerra
                        </Text>
                        <Text ta="center" c="dimmed" fz="sm">
                            her20053@uvg.edu.gt • Developer • Student
                        </Text>

                        <Button
                            variant="default"
                            fullWidth
                            mt="md"
                            onClick={() => handleGithubClick("https://github.com/her20053")}
                        >
                            Github
                        </Button>
                    </Paper>
                </Grid.Col>
                <Grid.Col span={4}>
                    <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
                        <Avatar
                            src="https://avatars.githubusercontent.com/u/61723252?v=4"
                            size={120}
                            radius={120}
                            mx="auto"
                        />
                        <Text ta="center" fz="lg" fw={500} mt="md">
                            Javier Mombiela Herrera
                        </Text>
                        <Text ta="center" c="dimmed" fz="sm">
                            mom20067@uvg.edu.gt • Developer • Student
                        </Text>

                        <Button
                            variant="default"
                            fullWidth
                            mt="md"
                            onClick={() => handleGithubClick("https://github.com/javim7")}
                        >
                            Github
                        </Button>
                    </Paper>
                </Grid.Col>
                <Grid.Col span={4}>
                    <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
                        <Avatar
                            src="https://avatars.githubusercontent.com/u/69815580?v=4"
                            size={120}
                            radius={120}
                            mx="auto"
                        />
                        <Text ta="center" fz="lg" fw={500} mt="md">
                            Pablo Gonzalez Ramos
                        </Text>
                        <Text ta="center" c="dimmed" fz="sm">
                            gon20362@uvg.edu.gt • Developer • Student
                        </Text>

                        <Button
                            variant="default"
                            fullWidth
                            mt="md"
                            onClick={() => handleGithubClick("https://github.com/IPablo271")}
                        >
                            Github
                        </Button>
                    </Paper>
                </Grid.Col>
                <Grid.Col span={4}>
                    <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
                        <Avatar
                            src="https://avatars.githubusercontent.com/u/63107636?v=4"
                            size={120}
                            radius={120}
                            mx="auto"
                        />
                        <Text ta="center" fz="lg" fw={500} mt="md">
                            Javier Valle
                        </Text>
                        <Text ta="center" c="dimmed" fz="sm">
                            val20159@uvg.edu.gt • Developer • Student
                        </Text>

                        <Button
                            variant="default"
                            fullWidth
                            mt="md"
                            onClick={() => handleGithubClick("https://github.com/Javier19-cmd")}
                        >
                            Github
                        </Button>
                    </Paper>
                </Grid.Col>
                <Grid.Col span={4}>
                    <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
                        <Avatar
                            src="https://avatars.githubusercontent.com/u/64711979?v=4"
                            size={120}
                            radius={120}
                            mx="auto"
                        />
                        <Text ta="center" fz="lg" fw={500} mt="md">
                            Sara Maria Paguaga
                        </Text>
                        <Text ta="center" c="dimmed" fz="sm">
                            pag20634@uvg.edu.gt • Developer • Student
                        </Text>

                        <Button
                            variant="default"
                            fullWidth
                            mt="md"
                            onClick={() => handleGithubClick("https://github.com/MGonza20")}
                        >
                            Github
                        </Button>
                    </Paper>
                </Grid.Col>
                <Grid.Col span={4}>
                    <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
                        <Avatar
                            src="https://media.licdn.com/dms/image/C4E03AQGQVSlnZDBFMw/profile-displayphoto-shrink_800_800/0/1634874646553?e=2147483647&v=beta&t=deN8YaaXZaRLNUcxa7-gUF20LTmjHLs4xOJuIGaE0j8"
                            size={120}
                            radius={120}
                            mx="auto"
                        />
                        <Text ta="center" fz="lg" fw={500} mt="md">
                            Carlos Valdez
                        </Text>
                        <Text ta="center" c="dimmed" fz="sm">
                            cjvaldez@uvg.edu.gt • Software Engineer • Professor
                        </Text>

                        <Button
                            variant="default"
                            fullWidth
                            mt="md"
                            onClick={() => handleGithubClick("https://www.linkedin.com/in/cvaldez1301/")}
                        >
                            LinkedIn
                        </Button>
                    </Paper>
                </Grid.Col>
            </Grid>


        </Center>
    );
}