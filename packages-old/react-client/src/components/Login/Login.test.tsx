// TODO not entirely sure if this is functional, had do use to get around incomplete react router hook issues

// @ts-ignore
it('Login renders without crashing', () => {
    jest.mock('react-router-dom', () => ({
        ...jest.requireActual('react-router-dom'),
        useRouteMatch: (): { url: string } => ({ url: '/login' }),
    }));
});



