# User Interface for Event Registration System

### Overview

The User Interface (UI) of the Event Registration System is designed to provide an intuitive and user-friendly experience for managing events and participants. It allows users to add, modify, and view events, as well as manage participant details for each event. The UI is developed using Vue 3, Vite, and Bootstrap.




## Repository Details

GitHub Repository: [events_front](https://github.com/5OO/events_front.git)


## Technical Stack

* Framework: [Vue 3](https://vuejs.org/)
* Build Tool: Vite  
* CSS Framework: Bootstrap 

## Features

 The UI is structured around several key views, each designed to handle specific aspects of event and participant management:

* Homepage: HomeView.vue displays lists of past and upcoming events using components FutureEvents.vue and PastEvents.vue,  with details such as event name, date, location, and number of participants and delete upcoming events, also navigate to detailed views of each event.
  Button 'add event' directs users to the view, where users can add new events.

  ![Screenshot 2024-05-13 at 08 11 47-avakuva](https://github.com/5OO/events_front/assets/27925052/b5f17235-f5e7-46c0-8f9a-330a8ade7759)

* Event Creation View: Allows users to add new events by entering details like the event name, date, location, and additional information for detailed descriptions.
  
![Screenshot 2024-05-13 at 08 12 28-add-new-event](https://github.com/5OO/events_front/assets/27925052/9a9f91d4-6e14-4a91-9dd5-660b1be7b154)

  
*  Participant View: Shows all participants registered for a specific event. Offers functionality to delete participants and navigate back to the homepage. Also it is possible the addition of new participants to an event. Supports distinguishing between individual and corporate participants, with fields tailored to each type.
  ![Screenshot 2024-05-12 at 23 15 47](https://github.com/5OO/events_front/assets/27925052/3a9b1e52-9d78-4385-aeb9-cfccf09dff94)

* Participant Detail View: Allows for viewing and editing details of individual participants, providing a form populated with existing data that can be updated.
![Screenshot 2024-05-12 at 23 16 29](https://github.com/5OO/events_front/assets/27925052/1fd3c005-3924-4d9a-b7ae-1f81c4861733)

## Navigation
The UI includes intuitive navigation options, with links and buttons facilitating movement between views. Each form offers "Back" buttons to return to previous screens.


## Recommended IDE Setup

Intellij IDEA

## Installation

The setup requires Node.js and npm installed on your machine, and the application can be run locally for development and testing purposes.
Clone project repository from Github: [events_front](https://github.com/5OO/events_front.git)
Enter project folder: events_front
## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
 
