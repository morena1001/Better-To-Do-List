import React from 'react'
import { useEffect } from 'react';
// import { useState } from 'react';

class counter {
    static count = 1;
}

export function Model() {
    // const [data, setData] = useState(null);

    useEffect(() => {
        fetch("/api/tasks")
          .then((res) => res.json())
          .then((data) =>  {
            // setData(data[0].word);
            for (let i = 0; i < data.length; i++) {
                ReadItem(data[i]);
            }
        });
    }, []);

    return (
        <>
            <ul class="list" id="list">
            </ul>
        </>
    );
}

export function CreateItem(e) {
    if (e.key === "Enter" && e.target.value !== "") {
        let string = 
            `{
                "id": ${counter.count}, 
                "task": "${e.target.value}", 
                "completed": "no"
            }`;
        ReadItem(JSON.parse(string)); 
        e.target.value = "";

        fetch('/api/tasks', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: string,
        })
        .then((res) => res.json())
        .then((data) => {console.log(data)});
    }
}

function ReadItem(data) {
    let newItem = document.createElement("li");
    newItem.setAttribute("class", "item");
    newItem.setAttribute("id", data.id);

    let newItemLabel = document.createElement("label");
    newItemLabel.setAttribute("class", "check");

    let newItemInput = document.createElement("input");
    newItemInput.setAttribute("type", "checkbox");
    newItemInput.setAttribute("name", "checkbox");
    newItemInput.setAttribute("value", "complete");
    newItemInput.setAttribute("class", "checkbox");
    newItemInput.setAttribute("job", "complete");
    newItemInput.onclick = UpdateItem;

    let newItemSpan = document.createElement("span");
    newItemSpan.setAttribute("class", "check-text");
    newItemSpan.setAttribute("name", "checkbox-text");
    newItemSpan.innerHTML = data.task;

    let newItemButton = document.createElement("button");
    newItemButton.setAttribute("value", "delete");
    newItemButton.setAttribute("class", "delete");
    newItemButton.setAttribute("job", "delete");
    newItemButton.onclick = DeleteItem;

    let newItemIcon = document.createElement("i");
    newItemIcon.setAttribute("class", "fa fa-trash");
    newItemIcon.setAttribute("value", "delete");

    newItemLabel.appendChild(newItemInput);
    newItemLabel.appendChild(newItemSpan);

    newItemButton.appendChild(newItemIcon);
    newItemLabel.appendChild(newItemButton);
    newItem.appendChild(newItemLabel);
    document.getElementById("list").appendChild(newItem);

    if (data.completed === "yes") {
        newItemInput.setAttribute("checked", "yes");
        newItemSpan.setAttribute("style", "text-decoration: line-through 1px");
    }

    counter.count++;
}

export function UpdateItem(e) {
    if (!e.target.checked) {
        e.target.parentElement.children[1].setAttribute("style", "text-decoration: none");
    }
    else {
        e.target.parentElement.children[1].setAttribute("style", "text-decoration: line-through 1px");
    }

    let itemId = e.target.parentElement.parentElement.id;
    let itemTask = e.target.parentElement.children[1].innerHTML;
    let itemCompleted = e.target.checked ? "yes" : "no";
    let string = 
            `{
                "id": ${itemId}, 
                "task": "${itemTask}", 
                "completed": "${itemCompleted}"
            }`;
    
    fetch("/api/tasks/" + itemId, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: string
    })
    .then((res) => res.json())
    .then((data) => {console.log(JSON.stringify(data))});
}

function DeleteItem(e) {
    counter.count--;
    let name = e.target.tagName;
    let itemId = name === "I" ? e.target.parentElement.parentElement.parentElement.id : 
                e.target.parentElement.parentElement.id;

    document.getElementById("list").removeChild(document.getElementById(itemId));

    fetch("/api/tasks/" + itemId, {
        method: "DELETE"
    })
    .then((res) => res.json())
    .then((data) => {console.log(JSON.stringify(data))});
}
