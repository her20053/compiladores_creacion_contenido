import { useState } from 'react';
import { Group, Code } from '@mantine/core';
import {
    IconChartBubbleFilled,
    IconListCheck,
    IconHelpHexagonFilled,
    IconSettings,
    IconUsers,
    IconBrandGithubFilled,
    IconSchool,
    IconSchema,
} from '@tabler/icons-react';
import classes from './NavbarMinimalColored.module.css';

import { FunctionComponent } from 'react';

const data = [
    { link: '', label: 'AFN Thompson', icon: IconChartBubbleFilled },
    { link: '', label: 'Ejemplos', icon: IconListCheck },
    { link: '', label: 'FAQ', icon: IconHelpHexagonFilled },
    { link: '', label: 'Créditos', icon: IconUsers },
    { link: '', label: 'Configuración', icon: IconSettings },
];

interface NavbarSimpleColoredProps {
    setSelectedOption: React.Dispatch<React.SetStateAction<string | null>>;
}

export const NavbarSimpleColored: FunctionComponent<NavbarSimpleColoredProps> = ({ setSelectedOption }) => {

    const [active, setActive] = useState('Ejemplos');

    const links = data.map((item) => (
        <a
            className={classes.link}
            data-active={item.label === active || undefined}
            href={item.link}
            key={item.label}
            onClick={(event) => {
                event.preventDefault();
                setActive(item.label);
                setSelectedOption(item.label);  // Actualiza el estado en HomePage
            }}
        >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </a>
    ));

    return (
        <nav className={classes.navbar}>
            <div className={classes.navbarMain}>
                <Group className={classes.header} justify="space-between">
                    <IconSchema size={28} style={{ color: 'white' }} />
                    <Code fw={700} className={classes.version}>
                        v0.1.1
                    </Code>
                </Group>
                {links}
            </div>

            <div className={classes.footer}>
                <a
                    href="https://github.com/her20053/Compiladores-Flask-AFN-Thompson"
                    className={classes.link}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <IconBrandGithubFilled className={classes.linkIcon} stroke={1.5} />
                    <span>Github</span>
                </a>

                <a
                    href="https://www.uvg.edu.gt"
                    className={classes.link}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <IconSchool className={classes.linkIcon} stroke={1.5} />
                    <span>Universidad Del Valle de Guatemala</span>
                </a>
            </div>
        </nav>
    );
}