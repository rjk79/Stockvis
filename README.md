# Stockvis
## Overview
Stockvis allows you to make more informed investing decisions by displaying trends in technical indicators in a dynamic, visually-appealing way. Stockvis renders historical financial data for companies according to their industries which allows you to examine technical indicators such as short and long term moving price averages, bollinger bands, and stochastic oscillators.

Short term and long term price moving averages (MA) are well-established means of evaluating a company's performance. If a short term MA is crossing through a long term one, then it is a buy signal (golden cross). If the opposite is occurring, then it is likely a sell signal (dead cross).

Bollinger bands are also highly instrumental in evaluating securities. When viewing them, there is a middle line that indicates a MA and two lines above and below, showing a certain number of standard deviations above and below the moving average, respectively. When the MA line crosses the upper one, the resistance level, this is a buy signal. When it crosses the lower one, the support level, this is a sell signal.

Lastly, stochastic oscillators are useful for gauging stocks since they show the closing price of a stock relative to its price range over a given time period. A high ratio generators a buy signal and the opposite generates a sell signal.

## Functionality
* Users can select the industry and time period they want to examine.
* Users can select the indicator they want to view: short and long term MA's, bollinger bands, or stochastic oscillators
* A 3D terrain-like line graph displays the technical indicator values.
* The graph lines render gradually in an aesthetically-pleasing manner.
* Favorable trends are color-coded.
## Wireframes
https://wireframe.cc/v3Q5Gz

## MVPs
* Render company financial data on a 3D line graph.
* Enable sorting by industry and time period.
* Enable switching between viewing moving average trend lines, stochastic oscillators, and Bollinger Bands.
* Interactive and smooth styling.
## Bonus:

* Allow filtering by market cap (company size).
* Implement viewing a single company's trends for a time period.
## Technologies
*Vanilla Javascript for graph logic
* D3 for visualizing data
* Webpack for bundling scripts
## Implementation Timeline
### Weekend
* Read documentation for D3
* Create project idea and develop proposal
### Day 1
* Acquire access to data and vet data.
* Create project skeleton.
* Construct basic rendering of data.
### Day 2
* Allow filtering by various industries and time periods.
### Day 3
* Implement viewing of moving averages and Bollinger Bands.
### Day 4
* Implement viewing of stochastic oscillators.
* Allow trend lines to render gradually.
### Day 5
* Create color coding on each type of graph to indicate favorable and unfavorable trends.
* Add Github/LinkedIn links.
* Style and polish project.
