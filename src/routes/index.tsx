import { Hono } from 'hono';
import { Auth } from 'auth';
import type { FC } from 'hono/jsx';
import type { UserJwtPayload } from 'db/schema';

const Home: FC<{ user: UserJwtPayload }> = ({ user }) => {
    return (
        <div>
            <h1>Welcome {user.name}</h1>
            <h2>
                Email {user.email} ID {user.id}
            </h2>
            <p>JWT expires at {new Date(user.exp! * 1000).toString()}</p>
        </div>
    );
};

type Variables = {
    jwtPayload: UserJwtPayload;
};

const indexRoute = new Hono<{ Variables: Variables }>();
indexRoute.use(Auth.middleware);

indexRoute.get('/', async (c) => {
    const user = c.get('jwtPayload');

    return c.render(<Home user={user} />);
});

export default indexRoute;
