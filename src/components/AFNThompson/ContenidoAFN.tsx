// Importa las dependencias necesarias de React y cualquier otra que necesites
import React, { useState, FormEvent } from 'react';

import { TextInput, Button, Group, Box, Center } from '@mantine/core';
import { useForm } from '@mantine/form';

import { Image } from '@mantine/core';


import ImagenPlaceHolder from '../../assets/placeholder-image.png';

// Define tu componente como una función de flecha
export const AFNThompsonComponent: React.FC = () => {
    const form = useForm({
        initialValues: {
            regex: '',
        },

        validate: {
            regex: (value) => (value.length < 20 ? null : 'Por favor utiliza menos de 20 caracteres.'),
        },
    });

    const [imageUrl, setImageUrl] = useState<string>(ImagenPlaceHolder);

    const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('user_input', form.values.regex);

            const response = await fetch('http://3.224.178.178:5000/generate', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            setImageUrl(url);
        } catch (error) {
            console.error("Error fetching the GIF:", error);
            // Mostrar una alerta emergente de error con window.alert()
            window.alert("Hubo un error al generar el GIF. Por favor, verifica la expresión regular.");
            setImageUrl(ImagenPlaceHolder); // Vuelve a la imagen de placeholder en caso de error
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
