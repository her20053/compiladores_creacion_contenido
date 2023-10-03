import { Center, Box } from '@mantine/core';
import { Accordion } from '@mantine/core';

export function FAQComponent() {

    const groceries = [
        {
            emoji: '🚀',
            value: '¿Qué es un Autómata Finito No Determinista (AFND)?',
            description:
                'Un AFND es una máquina abstracta que, dada una entrada de símbolos, puede pasar de un estado a otro, incluyendo la posibilidad de tener múltiples transiciones para un mismo símbolo o incluso transiciones sin consumir un símbolo, lo que lo hace "no determinista".',
        },
        {
            emoji: '🚀',
            value: '¿Qué es una Expresión Regular?',
            description:
                'Una expresión regular es una secuencia de caracteres que define un patrón. Se utiliza para reconocer y manejar cadenas de texto. Por ejemplo, el patrón "a*b" reconocería las cadenas "b", "ab", "aab", "aaab", y así sucesivamente.',
        },
        {
            emoji: '🚀',
            value: '¿Cómo se relacionan los AFND y las Expresiones Regulares?',
            description:
                'Los AFND y las expresiones regulares son dos maneras de representar lenguajes regulares. Se puede convertir una expresión regular a un AFND y viceversa, lo que significa que ambos tienen la capacidad de reconocer los mismos lenguajes.',
        },
        {
            emoji: '🚀',
            value: '¿Qué es una transición en un AFND?',
            description:
                'Una transición en un AFND es un cambio de estado basado en un símbolo de entrada. A diferencia de los autómatas finitos deterministas (AFD), un AFND puede tener múltiples transiciones posibles para un mismo símbolo, o incluso transiciones sin consumir un símbolo (transiciones ε).',
        },
        {
            emoji: '🚀',
            value: '¿Qué es un lenguaje regular?',
            description:
                'Un lenguaje regular es un conjunto de cadenas que pueden ser reconocidas por un autómata finito (determinista o no determinista) o definidas por una expresión regular. Son la clase más simple de lenguajes formales y tienen estructuras muy bien definidas.',
        },
        {
            emoji: '🚀',
            value: '¿Qué significa que un AFND es "no determinista"?',
            description:
                'Un AFND es "no determinista" porque puede tener más de un estado siguiente posible para un mismo símbolo de entrada, o incluso transiciones sin consumir un símbolo, lo que significa que su comportamiento no está determinado de manera única por la entrada y el estado actual.',
        },
        {
            emoji: '🚀',
            value: '¿Cómo se puede convertir un AFND a un AFD?',
            description:
                'La conversión de un AFND a un AFD se realiza mediante el método de construcción de subconjuntos. Este método agrupa los estados del AFND en conjuntos, donde cada conjunto representa un estado en el AFD. Este proceso elimina la no determinación y produce un autómata determinista equivalente.',
        },
    ];

    const items = groceries.map((item) => (
        <Accordion.Item key={item.value} value={item.value}>
            <Accordion.Control icon={item.emoji}>{item.value}</Accordion.Control>
            <Accordion.Panel>{item.description}</Accordion.Panel>
        </Accordion.Item>
    ));

    return (
        <Center h={1000} bg="var(--mantine-color-gray-light)">
            <Accordion variant="separated" defaultValue="¿Qué es un Autómata Finito No Determinista (AFND)?" style={{ maxWidth: "80%", minWidth: "80%" }} >
                {items}
            </Accordion>
        </Center>
    );
}