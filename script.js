document.getElementById('queryForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const queryField = document.getElementById('queryField').value;
    const queryValue = document.getElementById('queryValue').value;
    const queryId = document.getElementById('queryId').value;
    let query = {};

    if(queryId) {
        query = { _id: queryId };
    }
    else if (queryField && queryValue) {
        query = { [queryField]: queryValue };
    }

    try {
        const response = await fetch('/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(query),
        });

        const results = await response.json();
        document.getElementById('results').textContent = JSON.stringify(results, null, 2);
    } catch (error) {
        console.error('Error querying database:', error);
        document.getElementById('results').textContent = 'Error querying database';
    }
});

document.getElementById('addForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const addField = document.getElementById('addField').value;
    const addValue = document.getElementById('addValue').value;
    const data = { [addField]: addValue };

    try {
        const response = await fetch('/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        document.getElementById('results').textContent = JSON.stringify(result, null, 2);
    } catch (error) {
        console.error('Error adding data to database:', error);
        document.getElementById('results').textContent = 'Error adding data to database';
    }
});

document.getElementById('checkConnection').addEventListener('click', async () => {
    try {
        const response = await fetch('/check-connection');
        const data = await response.json();
        document.getElementById('connectionStatus').textContent = data.message;
    } catch (error) {
        console.error('Error checking connection:', error);
        document.getElementById('connectionStatus').textContent = 'Error checking connection';
    }
});
