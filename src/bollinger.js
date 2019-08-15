const Bollinger = () => {
    // let tick = document.getElementsByClassName("input-sma")[0].getAttribute("value")
    debugger
    var request = new XMLHttpRequest()
    request.open('GET', `https://www.alphavantage.co/query?function=BBANDS&symbol=MSFT&interval=weekly&time_period=5&series_type=close&nbdevup=3&nbdevdn=3&apikey=demo`, true)
    request.onload = function () {
        var data = JSON.parse(this.response)

    if (request.status >= 200 && request.status < 400) {
    // data = stockData
   
        reverseDataUppers = Object.values(data["Technical Analysis: BBANDS"])
            .map(el => parseFloat(el["Real Upper Band"]))
        reverseDataMiddles = Object.values(data["Technical Analysis: BBANDS"])
            .map(el => parseFloat(el["Real Middle Band"]))
        reverseDataLowers = Object.values(data["Technical Analysis: BBANDS"])
            .map(el => parseFloat(el["Real Lower Band"]))
        reverseDataYears = Object.keys(data["Technical Analysis: BBANDS"])
            .map(el => parseInt(el))

        dataUppers = reverseDataUppers.reverse()
        dataLowers = reverseDataLowers.reverse()
        dataMiddles = reverseDataMiddles.reverse()
        dataYears = reverseDataYears.reverse()
            var margin = { top: 50, right: 50, bottom: 50, left: 50 }
            var width = 950 - margin.left - margin.right
            var height = 500 - margin.top - margin.bottom

            var svg = d3.select('.svg-smas')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
            var g1 = svg.append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

            var x_scale = d3.scaleLinear()
                .domain([0, dataUppers.length - 1])
                .range([0, width])

            var new_x_scale = d3.scaleLinear()
                .domain([d3.min(dataYears), d3.max(dataYears)])
                .range([0, width])

            var y_scale = d3.scaleLinear()
                .domain([d3.max(dataUppers), 0])
                .range([height, 0])

            var new_y_scale = d3.scaleLinear()
                .domain([0, d3.max(dataUppers)])
                .range([height, 0])

            var x_axis = d3.axisBottom()
                .scale(new_x_scale)
                .tickFormat(d => `${d}`)
            var y_axis = d3.axisLeft()
                .scale(new_y_scale)

            g1.append("g")
                .attr("transform", "translate(0, 0)") //2nd val needs to adjust for y shifts
                .call(y_axis)

            g1.append("g")
                .attr("transform", "translate(0," + height + ")") //1st val needs to change
                .call(x_axis.ticks(10))

            var g = g1.selectAll("g")
                .data(dataUppers)
                .enter()
                .append("g")

            var lines = g.append('line')
                .attr('x1', function (d, idx) { return x_scale(idx - 1) - 20 })
                .attr('x2', function (d, idx) { return x_scale(idx) - 20 })

                .attr('y1', function (d, idx) { return height - 50 })
                .attr('y2', function (d, idx) { return height - 50 })

                // .attr("transform", "translate(25, 25)")
                .attr('class', 'line-sma')

            lines.transition()
                .duration(2000)
                .style('stroke', function (d, idx) {
                    if (d > dataUppers[idx - 1]) {
                        return 'cyan'
                    } else {
                        return 'hotpink'
                    }
                })
                .attr('y1', function (d, idx) { return y_scale(d3.max(dataUppers) - dataUppers[idx - 1]) })
                .attr('y2', function (d, idx) { return y_scale(d3.max(dataUppers) - d) })

            lines.on("mouseover", handleMouseOver)


// add more lines


        }
        else {
            console.log('error')
        }
    }
    request.send()


    function handleMouseOver(e) {

        document.getElementsByClassName("tooltip")[0].style.display = "inline-block"
        document.getElementsByClassName("tooltip")[0].innerHTML = "10-W SMA: $" + `${parseFloat(e).toFixed(2)}`
    }


    // document.getElementsByClassName("tooltip")[0].addEventListener('mouseleave', e => {
    //     document.getElementsByClassName("tooltip")[0].style.display = "none"
    // })

    Array.from(document.getElementsByClassName("line-sma")).forEach(el => {

        el.addEventListener('mouseenter', e => {

            document.getElementsByClassName("tooltip")[0].style.left = `${e.pageX}` + "px"
            document.getElementsByClassName("tooltip")[0].style.top = `${e.pageY}` + "px"
        }
        )
    }
    )
}

export default Bollinger