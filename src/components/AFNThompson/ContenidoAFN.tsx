// Importa las dependencias necesarias de React y cualquier otra que necesites
import React, { useState, FormEvent } from 'react';

import { TextInput, Checkbox, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';

import { Center } from '@mantine/core';

import { Image } from '@mantine/core';

import ImagenPlaceHolder from '../../assets/placeholder-image.png';

// Define tu componente como una función de flecha
export const AFNThompsonComponent: React.FC = () => {

    const form = useForm({
        initialValues: {
            regex: '',
        },

        validate: {
            regex: (value) => (value.length < 20 ? null : 'Porfavor utiliza menos de 20 caracteres.'),
        },
    });

    // Estado para la URL de la imagen
    const [imageUrl, setImageUrl] = useState<string>(ImagenPlaceHolder);

    // Función para manejar el envío del formulario
    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Previene el comportamiento predeterminado del formulario
        try {
            // La URL de la API que devuelve un GIF (Por ejemplo: una API pública de GIFs)
            const gifApiUrl = 'https://avatars.githubusercontent.com/u/70614527?v=4';

            const response = await fetch(gifApiUrl);
            const data = await response.json();

            // Asumiendo que la respuesta tiene una propiedad `data` que es la URL del GIF
            setImageUrl(data.data);
        } catch (error) {
            console.error("Error fetching the GIF:", error);
        }
    };

    return (
        <Center h={1000} bg="var(--mantine-color-gray-light)">
            <Box maw={500} mx="auto">
                <form onSubmit={handleOnSubmit}>
                    <TextInput
                        withAsterisk
                        label="Regex"
                        placeholder="(a|b)*abb"
                        {...form.getInputProps('regex')}
                    />

                    <Group justify="flex-end" mt="md">
                        <Button type="submit">Submit</Button>
                    </Group>
                </form>

                <Image
                    radius="md"
                    h={500}
                    w="auto"
                    fit="contain"
                    style={{ marginTop: "50px", marginLeft: "-100px" }}
                    src={imageUrl} // Usa el estado de la URL de la imagen aquí
                />
            </Box>
        </Center>
    );
};
