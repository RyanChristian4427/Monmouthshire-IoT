// This is an example router for how to get data from a neo4j database
import { Response, Request, Router } from 'express';

const router = Router();

router.get('/example', (req: Request, res: Response) => {
    const people: string[] = [];
    req.app.locals.driver.session().run(
        'MATCH (person:Person) RETURN properties(person) AS person'
    ).subscribe({
        onNext: function(record: any) {
             people.push(record.get('person'));
        },
        onCompleted: function() {
            res.send(people);
            req.app.locals.driver.session().close();
        },
        onError: function(error: any) {
            console.log(error);
        }
    });
});

export default router;