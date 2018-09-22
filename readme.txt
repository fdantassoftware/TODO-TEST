TODO APP

1.This server is simple and straightforward. It has different end points that allow for creation, deletion and update
of tasks.

2. The tasks are saved to a cloud instance of MondoDB using a service called MLAb.

3. The Api was design in a way to make very easy to integrate it on mobile apps.

4. The Editor used was Webstorm.

5. Each End point has a error description and a code. If there is an error the return will be a error code (-1, -2) and a description of the error. Otherwise error code will be 0 and description will be null indicating no erros.

6. I used a derivative of the MVC Pattern to separate my responsibilities. You will find a model folder where i put my logic, a routes folder where i handle all my endpoints. The index listen to requests made on the client and redirect them to the routes folder making easy to add
new functionalities. We also have a views folder where in the future you could put the front end if necessary.


