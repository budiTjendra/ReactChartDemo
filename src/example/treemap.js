import React,{useRef, useEffect} from 'react'
import  'chartjs-chart-treemap/dist/chartjs-chart-treemap';
import {initialState as usaStates} from './usastates';


const TreeMap = (props) => {
    const myCanvas = useRef()

    useEffect(() => {
      const ctx = myCanvas.current.getContext("2d")        
      simulate(ctx);

      return () => {
      }
    }, [])

    const simulate= (ctx) => {
      window.chart1 = new window.Chart(ctx, {
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
    

   return (
    <div>
      <canvas ref={myCanvas} id="chart-area" width="800" height="400"></canvas>
    </div>
   );
}


export default TreeMap