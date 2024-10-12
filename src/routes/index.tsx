import { Hono } from 'hono';
import { Auth } from 'auth';
import type { FC } from 'hono/jsx';
import * as schema from 'db/schema';

const Home: FC<{ user: schema.UserJwtPayload }> = ({ user }) => {
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

const indexRoute = new Hono<{ Variables: schema.Variables }>();
indexRoute.use(Auth.middleware);

indexRoute.get('/', async (c) => {
    const user = c.get('jwtPayload');

    return c.render(<Home user={user} />);
});

export default indexRoute;
