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
* Event Creation View: Allows users to add new events by entering details like the event name, date, location, and additional information for detailed descriptions.
*  Participant View: Shows all participants registered for a specific event. Offers functionality to delete participants and navigate back to the homepage. Also it is possible the addition of new participants to an event. Supports distinguishing between individual and corporate participants, with fields tailored to each type.
* Participant Detail View: Allows for viewing and editing details of individual participants, providing a form populated with existing data that can be updated.

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
 