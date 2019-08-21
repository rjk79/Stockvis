const Stochastic = () => {
    d3.selectAll(".svg-stochs > *")
        .remove();

    let tick = document.getElementsByClassName("input-sma")[0].value
    var request = new XMLHttpRequest()
    request.open('GET', `https://www.alphavantage.co/query?function=STOCH&symbol=${tick}&interval=weekly&apikey=T12XNN62PCMC53Y8`, true)
    request.onload = function () {
        var data = JSON.parse(this.response)
        if (request.status >= 200 && request.status < 400) {
            // let data = stochData
            let dateData = Object.keys(data["Technical Analysis: STOCH"])
            let priceData = Object.values(data["Technical Analysis: STOCH"])
            let slowK = priceData.map(el => parseFloat(el["SlowK"])) .reverse()
            let slowD = priceData.map(el => parseFloat(el["SlowD"])) .reverse() 
            let dates = dateData.map(el => d3.timeParse("%Y-%m-%d")(el)) .reverse()
            let dataYears = dateData.map(el => parseInt(el)) .reverse()
            //data = [date : {slowK: , slowD: }]
            let dataArr = []
            for(let i = 0; i < dateData.length; i ++) {
                
                dataArr.push({
                    date: dates[i],
                    slowK: slowK[i],
                    slowD: slowD[i],
                })
            }
            
            dataArr = dataArr.slice(dataArr.length * (19/20), -1)
            // dataArr = [ {data: , slowK: , slowD: }]
            
            

            //set SVG
            var margin = { top: 50, right: 50, bottom: 50, left: 50 }
            var width = 600 - margin.left
            var height = 500 - margin.bottom
            var svg = d3.select('.svg-stochs')
                .attr('width', width + margin.left)
                .attr('height', height + margin.bottom)
            //Scale everything
            var x_scale = d3.scaleTime() //scaleTime?
                .domain(d3.extent(dataArr, d => d.date))
                .range([0, width])        
            var y_scale = d3.scaleLinear()
                .domain([d3.max(slowK), 0]) //divide
                .range([height, 0]) //multiply by 500

            //Axes work =======================================
            var new_x_scale = d3.scaleLinear()
                .domain(d3.extent(dataArr, d => d.date))
                .range([0, width])
            var new_y_scale = d3.scaleLinear()
                .domain([0, d3.max(slowK)])
                .range([height, 0])
            var x_axis = d3.axisBottom()
                .scale(new_x_scale)
                .tickFormat(d => `${d3.timeFormat("%b %d, %Y")(d)}`)
            var y_axis = d3.axisLeft()
                .scale(new_y_scale)
            //Axis labels
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
                .call(x_axis.ticks(5))
            svg.append("text")
                .attr("transform", "translate(" + (width / 2 + margin.left) + " ," + (height + margin.bottom) + ")")
                .style("text-anchor", "middle")
                .text("Year");
            //=============================================
            //Slow K line
            var line1 = d3.line() //NEW
                .x((d, idx) => x_scale(d.date))
                .y((d, idx) => y_scale(d3.max(slowK) - d.slowK))

            var g1 = svg.append('g')
                .attr('transform', 'translate(' + margin.left + ', 0)')
                .attr('class', 'slowK-line')

            var path = g1.append('path') //new
                .attr('d', line1(dataArr))
                .attr('stroke', 'cyan')
                .attr('stroke-width', '2')
                .attr('fill', 'none')
                .attr('class', 'draw')

            //Slow D line
            var line2 = d3.line() //NEW
                .x((d, idx) => x_scale(d.date))
                .y((d, idx) => y_scale(d3.max(slowD) - d.slowD))
            var g2 = svg.append('g')
                .attr('transform', 'translate(' + margin.left + ', 0)')
                .attr('class', 'slowD-line')

            var path2 = g2.append('path') //new
                .attr('d', line2(dataArr))
                .attr('stroke', 'blue')
                .attr('stroke-width', '2')
                .attr('fill', 'none')
                .attr('class', 'draw')
                
           

        }
        else {
            console.log('error')
        }
    }
    request.send()

}

export default Stochastic