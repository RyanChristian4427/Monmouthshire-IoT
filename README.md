# Monmouthshire IoT Team #3

### The project has officially concluded, but the docs are still WIP, and some areas do need to be cleaned up. We had tough time constraints so some areas are not up to the standard I'd like to set, but this will be fixed when I can find the time. 

This was a university client project from the end of the first semester of third year. The goal of this project was to create an Internet of Things solution to our client's needs, while also integrating it with any other technologies we felt were applicable. 

The client requested two main services: create a network of sensors that can collect and store data from a household, and create a method for combating social isolation in the elderly. 

## Architecture

The architecture for this project is rather simple; there is a server hosting an Express API and a React client, and the Pi, which hosts its own service for polling the sensors, while it too has a React client that will be used to manage the device.

While we were rather limited in our choices for the IoT portion, as we were only given a Raspberry Pi and a couple Z-Wave sensors, we did have complete autonomy when it came to software. We decided to use React for the clients as it was something we were taught in class, so everyone knew it well. While 3/4 members did know Vue at least to a competent level, React was simply the easier option. Open Z-Wave has two wrappers for their library, one in Python, and one in JS. Because the documentation for the Python library is many years out of date, choosing Node was another easy choice. With 2/3 portions of the project already being built with JS, it was only natural to choose Express as our API server. 

## Authors

* **Ryan Christian** - *React and Express* - [Ryan Christian](https://github.com/RyanChristian4427)
* **Lauren Heymer** - *IoT, with some React and Express* - [Lauren Heymer](https://github.com/renHeymer)
* **James Buckland** - *Very minor Express work*
* **Owen Lever** - *No contributions made*

## Acknowledgments

* Thanks to the Monmouthshire Council for giving us this project to work on, and allowing us to use this as part of our portfolios.
