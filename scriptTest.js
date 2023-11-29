
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


    populateTable(mockData);
});

function populateTable(data) {
    const table = document.getElementById('alarmsTable');

    Object.keys(data).forEach((key, index) => {
        // Extraire les détails de l'alarme principale
        const parts = key.split(',');
        const name = parts[0].split(':')[1].trim();
        const severity = parts[1].split(':')[1].trim();
        const probableCause = parts[2].split(':')[1].trim();

        // Créer la ligne parente
        const parentRow = table.insertRow();

        // Cellule pour le nom
        const nameCell = parentRow.insertCell();
        nameCell.textContent = name;

        // Cellule pour la sévérité
        const severityCell = parentRow.insertCell();
        severityCell.textContent = severity;

        // Cellule pour la cause probable
        const probableCauseCell = parentRow.insertCell();
        probableCauseCell.innerHTML = `${probableCause} [<span class='expand' data-index='${index}'>+</span>]`;

        // Créer les lignes enfants avec les détails complets
        data[key].forEach(alarm => {
            const childRow = table.insertRow();
            childRow.classList.add('child-row', `child-of-${index}`);
            childRow.style.display = 'none'; // Modifier pour masquer initialement

            const cellName = childRow.insertCell();
            cellName.textContent = alarm.name;

            const cellSeverity = childRow.insertCell();
            cellSeverity.textContent = alarm.severity;
            cellSeverity.classList.add(alarm.severity);

            const cellProbableCause = childRow.insertCell();
            cellProbableCause.textContent = alarm.probableCause;
        });
    });

    // Gestionnaire de clic pour le signe '+'
    document.querySelectorAll('.expand').forEach(item => {
        item.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            const children = document.querySelectorAll(`.child-of-${index}`);
            children.forEach(child => {
                child.style.display = child.style.display === 'none' ? 'table-row' : 'none';
            });
            this.textContent = this.textContent === '+' ? '-' : '+';
        });
    });
}
