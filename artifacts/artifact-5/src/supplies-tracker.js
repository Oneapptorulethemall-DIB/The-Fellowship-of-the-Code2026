(function () {
    "use strict";
// const statt let um das objekt nicht mehr änderbar zu machen, Eigenschaft innerhalb kann immer noch geändert werden//
// Supply state object to track counts and minimums//
const state = { 
    lembas: {count: 0, min: 2, unit: "pcs", color: '#C8A97E' }, 
    potatoes: {count: 0, min: 6, unit: "pcs", color: '#D4A017'}, 
    water: {count: 0, min: 3, unit: "liter", color: '#4A90D9' }, 
    pipeweed: {count: 0, min: 1, unit: "kg", color: '#5A8A3C' }
};
function incrementSupply(itemName, direction) {
    if (direction === "add") {
        state[itemName].count++;
    } else {
        state[itemName].count--;
    }

    const warningElement = document.getElementById("warning-" + itemName);

    if (state[itemName].count <= state[itemName].min) {
        warningElement.hidden = false;
    } else {
        warningElement.hidden = true;
    }

    updateChart();
}
    /*function incrementSupply(itemName, direction) {
    if (direction === "add") {
        state[itemName].count++;
    } else {
        state[itemName].count--;
    }

    const warningElement = document.getElementById("warning-" + itemName);
    warningElement.hidden = !(state[itemName].count <= state[itemName].min);
} Eine kürzere option der oben geschriebnen funktion  mit dem warnfenster. Sie ist aber von der syntax her schwerer 
 zu lesen bzw zu verstehen es geht dabei darum was ! mit zahlen macht und wie das über die klammern verhindert wird.*/

document.getElementById('supply-list').addEventListener('click', function (event) {
    const clickedButton = event.target.closest('.btn-add, .btn-remove');

    if (clickedButton === null) {
        return;
    }

    const itemName = clickedButton.dataset.item;

    if (clickedButton.classList.contains('btn-add')) {
        incrementSupply(itemName, 'add');
    } else {
        incrementSupply(itemName, 'remove');
    }
});
/* der eventlistener ist auf die ganze liste gesetzt und nicht auf die einzelnen buttons,
das spart resourcen und ist einfacher zu warten. Das klicken funktioniert über die const closest,
die den nächsten button mit der klasse btn-add oder btn-remove sucht. Die if sSchleife mit ===null verhindert das 
die funktion weiterläuft wenn kein button geklickt wurde.*/

const chartInstance = new Chart(
    document.getElementById('supplies-chart'),
    {
        type: 'bar',

        data: {
            labels: Object.keys(state),
            datasets: [{
                data: Object.values(state).map(item => item.count),
                backgroundColor: Object.values(state).map(item => item.color),
                borderColor: Object.values(state).map(item => item.color),
                borderWidth: 1
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            const index = context.dataIndex;
                            const item = Object.values(state)[index];
                            return item.count + ' ' + item.unit;
                        }
                    }
                }
            },

            scales: {
                y: {
                    display: false
                }
            }
        }
    }
);

function updateChart() {
    chartInstance.data.datasets[0].data = Object.values(state).map(item => item.count);
    chartInstance.update();
} /* hält den chart aktuell, diese funktion wird  in der incrementSupply Funktion aufgerufen, 
damit der chart immer aktuell ist wenn ein button geklickt wird.*/

})();