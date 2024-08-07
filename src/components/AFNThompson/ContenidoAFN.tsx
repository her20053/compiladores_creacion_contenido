// Importa las dependencias necesarias de React y cualquier otra que necesites
import React, { useState, useEffect } from 'react';
const { ipcRenderer } = require('electron');
import type { IpcRendererEvent } from 'electron';

import { TextInput, Button, Group, Box, Center, Loader } from '@mantine/core';
import { useForm } from '@mantine/form';

import { Image } from '@mantine/core';


import ImagenPlaceHolder from '../../assets/placeholder-image.png';

// Define tu componente como una función de flecha
export const AFNThompsonComponent: React.FC = () => {

    const [backendReady, setBackendReady] = useState<boolean>(false);
    const [loadingGif, setLoadingGif] = useState<boolean>(false);

    useEffect(() => {
        const handleBackendReady = () => setBackendReady(true);
        ipcRenderer.on('backend-ready', handleBackendReady);
        if (backendReady === false) { ipcRenderer.send('check-backend-status')}

        return () => { ipcRenderer.removeListener('backend-ready', handleBackendReady) };
    }, [backendReady]);

    useEffect(() => {
        const handleBackendStatusResponse = (_event: IpcRendererEvent, status: boolean) => {
            if (status === true) { setBackendReady(true) }
            else if (status === false) { setBackendReady(false) }
        };

        ipcRenderer.on('backend-status-response', handleBackendStatusResponse);
        return () => { ipcRenderer.removeListener('backend-status-response', handleBackendStatusResponse)};
    }, []);
    
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
        setLoadingGif(true);
        try {
            const formData = new FormData();
            formData.append('user_input', form.values.regex);

            const response = await fetch('http://127.0.0.1:5000/generate', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data.gifUrl);
            setLoadingGif(false);
            setImageUrl(`${data.gifUrl}?${new Date().getTime()}`);

        } catch (error) {
            console.error("Error fetching the GIF:", error);
            // Mostrar una alerta emergente de error con window.alert()
            window.alert("Hubo un error al generar el GIF. Por favor, verifica la expresión regular.");
            setLoadingGif(false);
            setImageUrl(`${ImagenPlaceHolder}?${new Date().getTime()}`); // Vuelve a la imagen de placeholder en caso de error
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
                            style={{ flexGrow: 1 }}
                            {...form.getInputProps('regex')}
                        />
                        

                    <Group justify="flex-end" mt="md">
                        {loadingGif && <Loader size="sm" style={{ marginLeft: '10px' }} />}
                        <Button type="submit" disabled={!backendReady} >Submit</Button>
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
