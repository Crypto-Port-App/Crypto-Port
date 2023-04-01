import logo from './logo.svg';
import './App.css';
import { AppShell, Navbar, Header, Text, MediaQuery, Burger, ActionIcon, Group, createStyles, useMantineTheme} from '@mantine/core';
import { MantineProvider } from '@mantine/core';
import { SunIcon, MoonIcon } from '@modulz/radix-icons';
import { useState } from 'react';

import { MemoryRouter, NavLink, Route, Routes } from 'react-router-dom';

import { invoke } from '@tauri-apps/api';

import Home from './Home';
import Settings from './Settings';

function App() {

  const views = [{
    path: '/',
    name: 'Home',
    exact: true,
    component: Home,
  }, {
    path: '/settings',
    name: 'Settings',
    component: Settings,
  }];

  // mobile nav 
  const [opened, setOpened] = useState(false);
  const defaultColorScheme = 'dark';
  const [colorScheme, setColorScheme] = useState(defaultColorScheme);

  const toggleColorScheme = value => {
    const newValue = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(newValue);
  }

  const useStyles = createStyles((theme) => ({
    navLink: {
      display: 'block',
      width: '100%',
      padding: theme.spacing.xs,
      borderRadius: theme.radius.sm,
      color: colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
      textDecoration: 'none',

      '&:hover': {
        backgroundColor: colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
      }
    },
    navLinkActive: {
      backgroundColor: colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
    }
  }));

  const { classes } = useStyles();

  return (
    <MantineProvider theme={{ colorScheme: colorScheme, fontFamily: 'Open Sans, sans serif'  }} withGlobalStyles >
      <MemoryRouter>
        <AppShell padding='md' navbarOffsetBreakpoint='sm' fixed
        navbar={
          <Navbar width={{ sm: 200}} padding='xs' hidden={!opened} hiddenBreakpoint='sm'>
            {
              views.map((view, index) => 
              <NavLink align='center' to={view.path} key={index} onClick={() => setOpened(false)} className={({isActive}) => classes.navLink + ' ' + (isActive ? classes.navLinkActive : '')}>
                <Group><Text>{view.name}</Text></Group>
              </NavLink> 
              ) 
            }
          </Navbar>
        }
      header={
        <Header height={70} padding='md'>
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size='sm'
                color={useMantineTheme().colors.gray[6]}
                mr='xl'
              />
            </MediaQuery>
            <Text>Your coins</Text>
            <div style={{ marginLeft: 'auto' }}>
              <ActionIcon variant='default' onClick={() => toggleColorScheme}>
                {colorScheme === 'dark' ? <SunIcon /> : <MoonIcon />}
              </ActionIcon>
            </div>
          </div>
        </Header>
      }
      styles={theme => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
      >
        <Routes>
          {
            views.map((view, index) => <Route key={index} exact={view.exact} path={view.path} element={<view.component />} />)
          }
        </Routes>
        </AppShell>
      </MemoryRouter>
    </MantineProvider>
  )
}

export default App;
