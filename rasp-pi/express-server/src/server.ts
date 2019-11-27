import { app, server} from 'src/app';
import { port } from 'src/util/secrets';

server.listen(port, function(){
    console.log(`listening on port ${port}`);
});

export default app;
