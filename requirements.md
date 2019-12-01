# Requirements

## Functional Requirements (Or what is necessary for a system to work)

* Pi needs to be able to collect data from each sensor in the house, on a 2 minute interval?
  * Kitchen
    * Sensor 1
      * Humidity
      * Temperature
      * Light
      * Movement
    * Sensor 2
      * Plug - electrified flow
  * Bathroom
    * H, T, L, M
  * Living Room
    * H, T, L, M
  * Bedroom
    * H, T, L, M
  * Front Door
    * H, T, L, M
* Pi needs to be able to send data to a server
* Server needs to store the data (listed above) from the clients
* Server needs to return data for viewing
* A client needs to be able to view the data
  * Pie Chart - Percent of day spent in room (change with time, day, week, month, year, 5 years?)
  * Line Graph - Temp over time per room
  * Heatmap - Movement over the course of a day, for a period (week, month, year, 5 years?)
  * Line Graph - Kettle usage per day (find a good way to show differences in kettle use time over a period?)
  * Heatmap - Kettle Time of Use
  * Heatmap - Bathroom Humidity (aka, showers)
* Data needs to be presentable and digestible
* System needs to be setup and go (No input from user besides wifi password)
* System needs to help with social isolation in some way

## Non-Functional Requirements (Or non-critical requirements)

* Interface on web client should be attractive to keep interest
  * Bright colors should help with this

## Data Requirements (Or what information do we need to build the system)

* Example data from each type of sensor
