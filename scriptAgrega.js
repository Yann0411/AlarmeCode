document.addEventListener("DOMContentLoaded", function() {
    const mockData = {
        "name: CriticalAlarm1,severity: CRITICAL,probableCause: Network failure": [
            {
                "name":"CriticalAlarm1_1",
                "severity":"CRITICAL",
                "probableCause":"Network failure"
            },
            {
                "name":"CriticalAlarm1_2",
                "severity":"MAJOR",
                "probableCause":"Server outage"
            }
        ],
        "name: CriticalAlarm2,severity: MAJOR,probableCause: Network failure": [
            {
                "name":"INFOAlarm2_1",
                "severity":"INFO",
                "probableCause":"High events handling"
            },
            {
                "name":"CriticalAlarm2_2",
                "severity":"MAJOR",
                "probableCause":"Server outage"
            }
        ],
        "name: CriticalAlarm3,severity: MAJOR,probableCause: Network failure": [
            {
                "name":"INFOAlarm3_1",
                "severity":"MAJOR",
                "probableCause":"Network failure"
            },
            {
                "name":"CriticalAlarm3_2",
                "severity":"CRITICAL",
                "probableCause":"Server outage"
            }
        ],
        "name: CriticalAlarm4,severity: MAJOR,probableCause: Network failure": [
            {
                "name":"INFOAlarm4_1",
                "severity":"INFO",
                "probableCause":"High events handling"
            },
            {
                "name":"CriticalAlarm4_2",
                "severity":"MAJOR",
                "probableCause":"Server outage"
            }
        ],
        "name: CriticalAlarm5,severity: MAJOR,probableCause: Network failure": [
            {
                "name":"INFOAlarm5_1",
                "severity":"INFO",
                "probableCause":"High events handling"
            },
            {
                "name":"CriticalAlarm5_2",
                "severity":"MAJOR",
                "probableCause":"Server outage"
            }
        ],
        "name: CriticalAlarm6,severity: MAJOR,probableCause: Network failure": [
            {
                "name":"INFOAlarm6_1",
                "severity":"INFO",
                "probableCause":"High events handling"
            },
            {
                "name":"CriticalAlarm6_2",
                "severity":"CRITICAL",
                "probableCause":"Server outage"
            }
        ],
        "name: CriticalAlarm7,severity: MAJOR,probableCause: Network failure": [
            {
                "name":"INFOAlarm7_1",
                "severity":"INFO",
                "probableCause":"High events handling"
            },
            {
                "name":"CriticalAlarm7_2",
                "severity":"MAJOR",
                "probableCause":"Server outage"
            }
        ],
        "name: CriticalAlarm8,severity: MAJOR,probableCause: Network failure": [
            {
                "name":"INFOAlarm8_1",
                "severity":"INFO",
                "probableCause":"High events handling"
            },
            {
                "name":"CriticalAlarm8_2",
                "severity":"MAJOR",
                "probableCause":"Server outage"
            }
        ],
        "name: CriticalAlarm9,severity: MAJOR,probableCause: Network failure": [
            {
                "name":"INFOAlarm9_1",
                "severity":"CRITICAL",
                "probableCause":"High events handling"
            },
            {
                "name":"CriticalAlarm9_2",
                "severity":"MAJOR",
                "probableCause":"Server outage"
            }
        ],
        "name: CriticalAlarm10,severity: MAJOR,probableCause: Network failure": [
            {
                "name":"INFOAlarm10_1",
                "severity":"CRITICAL",
                "probableCause":"High events handling"
            },
            {
                "name":"CriticalAlarm10_2",
                "severity":"MAJOR",
                "probableCause":"Server outage"
            }
        ],
        "name: CriticalAlarm11,severity: MAJOR,probableCause: Network failure": [
            {
                "name":"INFOAlarm11_1",
                "severity":"INFO",
                "probableCause":"High events handling"
            },
            {
                "name":"CriticalAlarm11_2",
                "severity":"CRITICAL",
                "probableCause":"Server outage"
            }
        ],
        "name: CriticalAlarm12,severity: MAJOR,probableCause: Network failure": [
            {
                "name":"INFOAlarm12_1",
                "severity":"INFO",
                "probableCause":"High events handling"
            },
            {
                "name":"CriticalAlarm12_2",
                "severity":"MAJOR",
                "probableCause":"Server outage"
            }
        ],
        "name: CriticalAlarm13,severity: MAJOR,probableCause: Network failure": [
            {
                "name":"INFOAlarm13_1",
                "severity":"CRITICAL",
                "probableCause":"High events handling"
            },
            {
                "name":"CriticalAlarm13_2",
                "severity":"MAJOR",
                "probableCause":"Server outage"
            }
        ]
    };

    populateAggregationTable(mockData);
    populateAssociationTable(mockData);
});

function createTableRow(table, data, isChildRow = false, parentIndex = null) {
    const row = table.insertRow();
    for (const key in data) {
        const cell = row.insertCell();
        cell.textContent = data[key];
        if (key === 'severity') {
            cell.classList.add(data[key]);
        }
    }

    if (isChildRow) {
        row.classList.add('child-row', `child-of-${parentIndex}`);
        row.style.display = 'none'; 
    }

    return row;
}

function populateAggregationTable(data) {
    const table = document.getElementById('aggregationTable');
    Object.keys(data).forEach(key => {
        const alarmDetails = extractAlarmDetails(key);
        createTableRow(table, alarmDetails);
    });
}

function populateAssociationTable(data) {
    const table = document.getElementById('associationTable');
    Object.entries(data).forEach(([key, alarms], index) => {
        const mainAlarmDetails = extractAlarmDetails(key);
        const row = createTableRow(table, mainAlarmDetails);

        // Ajouter le symbole '+'
        const expandCell = row.insertCell();
        expandCell.innerHTML = `<span class='expand' data-index='${index}'>+</span>`;
        expandCell.classList.add('expand-cell');

        // Ajouter les lignes enfant
        alarms.forEach(alarm => createTableRow(table, alarm, true, index));
    });

    attachExpandEventListeners();
}

function extractAlarmDetails(key) {
    return key.split(',').reduce((details, part) => {
        const [key, value] = part.split(':');
        details[key.trim()] = value.trim();
        return details;
    }, {});
}

function attachExpandEventListeners() {
    document.querySelectorAll('.expand').forEach(item => {
        item.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            const children = document.querySelectorAll(`.child-of-${index}`);
            let isHidden = children[0].style.display === 'none';
            children.forEach(child => child.style.display = isHidden ? '' : 'none');
            this.textContent = isHidden ? '-' : '+';
        });
    });
}
