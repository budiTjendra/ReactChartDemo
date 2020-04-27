import React from 'react'
import  'chartjs-chart-treemap/dist/chartjs-chart-treemap';
import {initialState as usaStates} from './usastates';

class TreeMap extends React.Component {
    constructor(props){
        super(props)
        this.myCanvas = React.createRef()
        
    }

    colorFromValue(value, border) {
        var alpha = (1 + Math.log(value)) / 5;
        var color = "purple";
        if (border) {
          alpha += 0.01;
        }
        return window.Color(color)
          .alpha(alpha)
          .rgbString();
    }

    simulate(){
        console.log(usaStates)
        window.chart1 = new window.Chart(this.ctx, {
            type: "treemap",
            data: {
                datasets: [{
                    label: 'Basic treemap',
                    tree: usaStates,
                    key: "area",
                    groups: ['state'],
                    spacing: -0.5,
                    borderWidth: 0.5,                    
                    fontColor: 'white',
                    borderColor: "rgba(200,200,200,1)",
                    fontFamily: 'serif',
                    fontSize: 12,
                    fontStyle: 'normal',
                    backgroundColor: function(ctx) {
                        var value = ctx.dataset.data[ctx.dataIndex];
                        var alpha = (value + 3) / 10;
                        return window.Color('gray').alpha(alpha).rgbString();
                    }
                }]                
            },
            options:{
                title: {
                    display: true,
                    text: "Switchable key and groups"
                  }, 
                  tooltips: {
                    callbacks: {
                      title: function(item, data) {
                        return data.datasets[item[0].datasetIndex].key;
                      },
                      label: function(item, data) {
                        var dataset = data.datasets[item.datasetIndex];
                        var dataItem = dataset.data[item.index];
                        var obj = dataItem._data;
                        var label = obj.state || obj.division || obj.region;
                        return label + ': ' + dataItem.v;
                      }
                    }
                  }                  
            }
          });
    }

    componentDidMount() {
        this.ctx = this.myCanvas.current.getContext("2d")        
        this.simulate()          
    }
    render() {
        return (  
            <div>
                <canvas ref={this.myCanvas} id="chart-area" width="800" height="400"></canvas>
            </div>
        );
    }
}

export default TreeMap