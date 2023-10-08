![Old building](./src/assets/logo.png) 
# aBiblioteca
aBiblioteca is a simple front-end project created with the intent of practicing web development with Angular framework. aBiblioteca is a place where you can keep track of your favorite movies, books and albums. You can also rate them, tag them and put some additional information about them. All of those info are kept on a firestore database. Even though that's a very basic project, the proccess of its creation involved the development of a series of core angular concepts like pipes, directives and services. The only additional libraries used were tailwind and angular-fire. Because of that, all of the core components as cards, navbar, buttons, etc as well as functionalities and animations were created natively without using any third-party libraries.

![print screen home page](https://github.com/tahgio/aBiblioteca/assets/99019446/24305f05-cfb0-4636-b6c2-97c3d0e9f520)

# Highlights
## Tooltip directive
I've created a reusable tooltip directive that makes possible to choose a position, text and color of a small info card that will pop-up for a given component. The directive listen for mouseenter and mouseleave events and init/destroy a div according to it. You can check out the code for the directive in the following links: 
#### [directive](./src/app/core/directives/tooltip/tooltip.directive.ts) | [component](./src/app/elements/tooltip) 
![Tooltip directive use case example](https://github.com/tahgio/aBiblioteca/assets/99019446/20cd1c99-2eb2-4a3e-b838-a47c89b58750)

## Toast Service / Directive
There is also a message service available that can display info, warning, error and success messages by applying a card at the bottom of the page. The service allows the creation of a temporary toast with the duration of three seconds or a persistent one. There is also a directive available that listens for hover events and calls the service accordingly. You can check out the code related to it in the following links:
#### [service](./src/app/core/services/message/message.service.ts) | [component](./src/app/elements/toast) | [directive](./src/app/core/directives/hover-info/hover-info.directive.ts)
![Toast service use case example](https://github.com/tahgio/aBiblioteca/assets/99019446/2312e505-ad3a-475e-af01-d9b070ec4ad6)

## Form Arrays
For each item, it's possible to add some info like quotes for books, movie lines for movies or tracks for albums. That was made possible using formArrays from Angular. Clicking the button will push a new form to the array. Models created using typescript helped to assert that all of the info was set up correctly before sending it to the database. You can check out the code related to it in the following links:
#### [component](./src/app/elements/add-form) | [page](./src/app/pages/adicionar)
![Form use case example](https://github.com/tahgio/aBiblioteca/assets/99019446/ea74a9d9-cee3-4fdb-86fa-739c92c3b65c)

## Modal
A modal directive was created following a similar logic implemented for the tooltip and the toast. The directive opens a modal when clicked and gives the user two options: cancel and confirm action. The cancel action is handled by the directive itself, it closes the modal and goes back to previous app state. The confirm action emits an event with a boolean set to true that can be handled with a function by the component that uses the directive. You can check out the code related to it in the following links:
#### [directive](./src/app/core/directives/modal/modal.directive.ts) | [component](./src/app/elements/modal) 
![Modal use case example](https://github.com/tahgio/aBiblioteca/assets/99019446/d0eddabc-3d0f-4bd1-bf27-9de2c7ce6417)

## Star Rating input
A custom input was created for rating the items added to the library. The same component is also used for showing the rate of an item after it was created. This was made possible by using the NG_VALUE_ACCESSOR Angular provides. The rating is done by the user clicking in a sequence of five stars. From one to five the user can decide to give a five start rating by clicking on the fifth star, four by clickng on the fourth and so on. When submiting the form a number from one to five is sent to the database. You can check out the code related to it in the following links:
#### [component](./src/app/elements/star-rating)
![Star Rating input use case example](https://github.com/tahgio/aBiblioteca/assets/99019446/21627170-8535-4aa1-be03-6be11a5d73a2)

## Store service
All of the CRUD operations are handled by a service called store. It uses angular-fire to easily create, read, update and delete items and field in the database. You can check out the code related to it [here](./src/core/services/store/store.service.ts)

## A lot of learning
Despite being a very basic project, the goal of learning and evolving my skills in Typescript and the Angular framework was well achieved. After finishing the first version of this project I realized that there's still a lot to learn. But even a simple project like this one made me identify some code practices that can be improved and some over engineering that can be simplified for the next projects. I'm very happy to finish this project, even though a code project can never be called finished as there's always some small bugs to fix and new features to be created.



 


