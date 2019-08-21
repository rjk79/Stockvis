const Bollinger = () => {
    d3.selectAll(".svg-bolls > *")
        
        .remove();

    //grab info from form
    let tick = document.getElementsByClassName("input-sma")[0].value
    
    //make the request
    var request = new XMLHttpRequest()
    request.open('GET', `https://www.alphavantage.co/query?function=BBANDS&symbol=${tick}&interval=weekly&time_period=5&series_type=close&nbdevup=3&nbdevdn=3&apikey=T12XNN62PCMC53Y8`, true)
    request.onload = function () {
        var data = JSON.parse(this.response)
        console.log(data)
    if (request.status >= 200 && request.status < 400) {
        
        // let data = bollData
        //vet the data
        let reverseDataUppers = Object.values(data["Technical Analysis: BBANDS"])
            .map(el => parseFloat(el["Real Upper Band"]))
        let reverseDataMiddles = Object.values(data["Technical Analysis: BBANDS"])
            .map(el => parseFloat(el["Real Middle Band"]))
        let reverseDataLowers = Object.values(data["Technical Analysis: BBANDS"])
            .map(el => parseFloat(el["Real Lower Band"])) .map(el => el >= 0 ? el : 0)
        let reverseDataYears = Object.keys(data["Technical Analysis: BBANDS"])
            .map(el => parseInt(el))
        //reverse all of it
        let dataUppers = reverseDataUppers.reverse()
        let dataLowers = reverseDataLowers.reverse()
        let dataMiddles = reverseDataMiddles.reverse()
        let dataYears = reverseDataYears.reverse()
        
        //set svg
            var margin = { top: 50, right: 50, bottom: 50, left: 50 }
            var width = 600 - margin.left 
            var height = 500 - margin.bottom

            var svg = d3.select('.svg-bolls')
                .attr('width', width + margin.left)
                .attr('height', height + margin.bottom)
            
            var x_scale = d3.scaleLinear()
                .domain([0, dataUppers.length - 1])
                .range([0, width])

            var new_x_scale = d3.scaleLinear()
                .domain([d3.min(dataYears), d3.max(dataYears)])
                .range([0, width])

            var y_scale = d3.scaleLinear()
                .domain([d3.max(dataUppers), 0]) //divide by MAX of highest band
                .range([height, 0]) //multiply by 500

            var new_y_scale = d3.scaleLinear()
                .domain([0, d3.max(dataUppers)])
                .range([height, 0])

            var x_axis = d3.axisBottom()
                .scale(new_x_scale)
                .tickFormat(d => `${d}`)
            var y_axis = d3.axisLeft()
                .scale(new_y_scale)

            svg.append("g")
                .attr("transform", "translate(50, 0)") //2nd val needs to adjust for y shifts
                .call(y_axis)
            svg.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", margin.left - 30)
                .attr("x", 0 - (height / 2))
                .style("text-anchor", "middle")
                .text("$");      

                
            svg.append("g")
            .attr("transform", "translate(50," + height + ")") //1st val needs to change
            .call(x_axis.ticks(10))

            svg.append("text")
                .attr("transform", "translate(" + (width / 2 + margin.left) + " ," + (height + margin.bottom ) + ")")
                .style("text-anchor", "middle")
                .text("Year");

            
            //Higher band
            var line = d3.line() //NEW
                        .x((d, idx) => x_scale(idx))
                        .y((d, idx) => y_scale( d3.max(dataUppers) - d ) ) 

            var g1 = svg.append('g')
                .attr('transform', 'translate(' + margin.left + ', 0)')

            var path = g1.append('path') //new
                        .attr('d', line(dataUppers))
                .attr('stroke', 'rgb(161, 185, 22)')
                        .attr('stroke-width', '2')
                        .attr('fill', 'none')
                        .attr('class', '')

            
            //Middle line

            var g2 = svg.append('g')
                .attr('transform', 'translate(' + margin.left + ', 0)')
                .attr('class', 'middle-band')

            var path2 = g2.append('path') //new
                .attr('d', line(dataMiddles))
                .attr('stroke', 'rgb(25, 25, 25)')
                .attr('stroke-width', '2')
                .attr('fill', 'none')
                .attr('class', 'draw flashing')
            // var g5 = g4.selectAll("g")
            //     .data(dataMiddles)
            //     .enter()
            //     .append("g")

            // var lines3 = g5.append('line')
            //     .attr('x1', function (d, idx) { return x_scale(idx - 1) })
            //     .attr('x2', function (d, idx) { return x_scale(idx) })
            //     .attr('y1', function (d, idx) { return y_scale(d3.max(dataUppers) - (dataMiddles[idx - 1] || d)) })
            //     .attr('y2', function (d, idx) { return y_scale(d3.max(dataUppers) - d) })

            //     .style('stroke', '#00cccc')
            //     .attr('class', 'line-boll middle')

            //Lower band
            var g2 = svg.append('g')
                .attr('transform', 'translate(' + margin.left + ', 0)')
                .attr('class', 'lower-band')

            var g3 = g2.selectAll("g")
                .data(dataLowers)
                .enter()
                .append("g")

            var lines2 = g3.append('line')
                .attr('x1', function (d, idx) { return x_scale(idx - 1)  })
                .attr('x2', function (d, idx) { return x_scale(idx)  })

                .attr("stroke-opacity", 0)
                .attr('y1', function (d, idx) { return height - 50 })
                .attr('y2', function (d, idx) { return height - 50 })
            lines2.transition()
                .duration(2000)
                .attr("stroke-opacity", 1)

                .attr('y1', function (d, idx) { return y_scale(d3.max(dataUppers) - (dataLowers[idx - 1] || d)) })
                .attr('y2', function (d, idx) { return y_scale(d3.max(dataUppers) - d) })

            
                .style('stroke', 'hotpink')
                .attr('class', 'line-boll lower')
            
            
            const fade = () => {
            svg.selectAll(".upper, .lower")     
                .transition()
                .duration(2000)
                .style('opacity', ".5")
                .transition()
                .duration(2000)
                .style('opacity', "1.0")
                .on("end", fade)
            }

        }
        else {
            console.log('error')
        }
    }
    request.send()


    function handleMouseOver(e) {

        document.getElementsByClassName("tooltip")[0].style.display = "inline-block"
        document.getElementsByClassName("tooltip")[0].innerHTML = "$" + `${parseFloat(e).toFixed(2)}`
    }

    // fade()

}

export default Bollinger