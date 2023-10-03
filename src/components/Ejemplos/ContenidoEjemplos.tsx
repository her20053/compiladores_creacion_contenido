import cx from 'clsx';
import { rem, Text } from '@mantine/core';
import { useListState } from '@mantine/hooks';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { IconGripVertical } from '@tabler/icons-react';
import classes from './DndListHandle.module.css';

import { Image } from '@mantine/core';

const data = [
    { expresion: "ab*aab*", symbol: '*', name: 'Cerradura Kleene' },
    { expresion: "ab|cd|ef", symbol: '|', name: 'Or' },
    { expresion: "aaa+fff", symbol: '+', name: 'Cerradura positiva' },
    { expresion: "2?3?", symbol: '?', name: 'Or Epsilum' },
    { expresion: "abc123def456", symbol: '.', name: 'Concatenación' },
    { expresion: "a*b+c?", symbol: '*+?', name: 'Kleene, Positiva y Opcional' },
    { expresion: "a|b*c+", symbol: '|*+', name: 'Or, Kleene y Positiva' },
    { expresion: "ab?|c*", symbol: '?|*', name: 'Opcional, Or y Kleene' },
    { expresion: "a+b*|c", symbol: '+*|', name: 'Positiva, Concatenación, Kleene y Or' },
    { expresion: "1*|2+", symbol: '*|+', name: 'Kleene, Or y Positiva' },
    { expresion: "a?b+c*", symbol: '?+*', name: 'Opcional, Positiva y Kleene' },
    { expresion: "0|12?", symbol: '|.?', name: 'Or, Concatenación y Opcional' },
    { expresion: "a*b|c+", symbol: '*|+', name: 'Kleene, Or y Positiva' },
    { expresion: "x?y*z|w", symbol: '?*|', name: 'Opcional, Kleene y Or' },
    { expresion: "a?b*|c+", symbol: '?.*|+', name: 'Opcional, Concatenación, Kleene y Or' },
    { expresion: "1+2*3|4", symbol: '+.*|', name: 'Positiva, Concatenación, Kleene y Or' },
];

export function EjemplosComponent() {
    const [state, handlers] = useListState(data);

    const items = state.map((item, index) => (
        <Draggable key={item.symbol} index={index} draggableId={item.symbol}>
            {(provided, snapshot) => (
                <div
                    className={cx(classes.item, { [classes.itemDragging]: snapshot.isDragging })}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                >
                    <div {...provided.dragHandleProps} className={classes.dragHandle}>
                        <IconGripVertical style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                    </div>
                    <Text className={classes.symbol}>{item.symbol}</Text>
                    <div>
                        <Text>{item.name}</Text>
                        <Text c="dimmed" size="sm">
                            Expresion regular: {item.expresion}
                        </Text>

                    </div>

                </div>
            )}
        </Draggable>
    ));

    return (
        <DragDropContext
            onDragEnd={({ destination, source }) =>
                handlers.reorder({ from: source.index, to: destination?.index || 0 })
            }
        >
            <Droppable droppableId="dnd-list" direction="vertical">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {items}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}