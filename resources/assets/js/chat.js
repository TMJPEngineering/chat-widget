/* eslint no-shadow:*/
var config = {
    token: getCookie('_chat-token'),
    link: 'http://localhost:4000'
};

if (config.token == undefined) {
    fetchIp('https://jsonip.com/');
} else {
    config.link = config.link + '?token=' + config.token;
    activate(config);
}

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

function fetchIp(url) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            var ipAddress = result.ip;
            var userAgent = navigator.userAgent;
            fetchToken(ipAddress, userAgent);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function fetchToken(ipAddress, userAgent) {
    var xmlhttp = new XMLHttpRequest();
    var url = config.link + '/generate-token?ip=' + ipAddress + '&agent=' + userAgent;

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            var date = new Date(result.expired_at);
            document.cookie = '_chat-token=' + result.value + '; expires=' + date.toUTCString() + ';';
            config.link = config.link + '?token=' + result.value;
            activate(config);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function activate(config) {
    var miniChatContainer = document.createElement('div');
    miniChatContainer.setAttribute('class', 'mini-chat-container');

    var miniChatHtml =
    '<div class="mini-chat-pane">' +
      '<iframe class="mini-chat-iframe" src="' + config.link + '"></iframe>' +
    '</div>' +
    '<div class="mini-chat-menu" id="mini-chat-menu">' +
      '<img class="mini-chat-menu-icon">' +
    '</div>';

    miniChatContainer.innerHTML = miniChatHtml;

    var timesClass = 'mini-chat-times-icon';
    var miniChatMenuIconClass = document.getElementsByClassName('mini-chat-menu-icon');
    var miniChatPaneClass = document.getElementsByClassName('mini-chat-pane');
    var miniChatMenuClass = document.getElementsByClassName('mini-chat-menu');

    var envelopeImage = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHdpZHRoPSIxNzkyIiBoZWlnaHQ9IjE3OTIiIHZpZXdCb3g9IjAgMCAxNzkyIDE3OTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTE2NjQgMTUwNHYtNzY4cS0zMiAzNi02OSA2Ni0yNjggMjA2LTQyNiAzMzgtNTEgNDMtODMgNjd0LTg2LjUgNDguNS0xMDIuNSAyNC41aC0ycS00OCAwLTEwMi41LTI0LjV0LTg2LjUtNDguNS04My02N3EtMTU4LTEzMi00MjYtMzM4LTM3LTMwLTY5LTY2djc2OHEwIDEzIDkuNSAyMi41dDIyLjUgOS41aDE0NzJxMTMgMCAyMi41LTkuNXQ5LjUtMjIuNXptMC0xMDUxdi0yNC41bC0uNS0xMy0zLTEyLjUtNS41LTktOS03LjUtMTQtMi41aC0xNDcycS0xMyAwLTIyLjUgOS41dC05LjUgMjIuNXEwIDE2OCAxNDcgMjg0IDE5MyAxNTIgNDAxIDMxNyA2IDUgMzUgMjkuNXQ0NiAzNy41IDQ0LjUgMzEuNSA1MC41IDI3LjUgNDMgOWgycTIwIDAgNDMtOXQ1MC41LTI3LjUgNDQuNS0zMS41IDQ2LTM3LjUgMzUtMjkuNXEyMDgtMTY1IDQwMS0zMTcgNTQtNDMgMTAwLjUtMTE1LjV0NDYuNS0xMzEuNXptMTI4LTM3djEwODhxMCA2Ni00NyAxMTN0LTExMyA0N2gtMTQ3MnEtNjYgMC0xMTMtNDd0LTQ3LTExM3YtMTA4OHEwLTY2IDQ3LTExM3QxMTMtNDdoMTQ3MnE2NiAwIDExMyA0N3Q0NyAxMTN6IiBmaWxsPSIjZmZmIi8+PC9zdmc+";
    var timesImage = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB3aWR0aD0iMTc5MiIgaGVpZ2h0PSIxNzkyIiB2aWV3Qm94PSIwIDAgMTc5MiAxNzkyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0xNDkwIDEzMjJxMCA0MC0yOCA2OGwtMTM2IDEzNnEtMjggMjgtNjggMjh0LTY4LTI4bC0yOTQtMjk0LTI5NCAyOTRxLTI4IDI4LTY4IDI4dC02OC0yOGwtMTM2LTEzNnEtMjgtMjgtMjgtNjh0MjgtNjhsMjk0LTI5NC0yOTQtMjk0cS0yOC0yOC0yOC02OHQyOC02OGwxMzYtMTM2cTI4LTI4IDY4LTI4dDY4IDI4bDI5NCAyOTQgMjk0LTI5NHEyOC0yOCA2OC0yOHQ2OCAyOGwxMzYgMTM2cTI4IDI4IDI4IDY4dC0yOCA2OGwtMjk0IDI5NCAyOTQgMjk0cTI4IDI4IDI4IDY4eiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==";

    document.body.appendChild(miniChatContainer);

    // Set envelope icon
    miniChatMenuIconClass[0].setAttribute('src', envelopeImage);

    document.getElementById('mini-chat-menu').addEventListener('click', function () {
        miniChatMenuIconClass[0].classList.toggle(timesClass);
        miniChatPaneClass[0].classList.toggle('show');
        miniChatPaneClass[0].children[0].classList.toggle('show');
        miniChatMenuClass[0].classList.toggle('show');

        if (miniChatMenuIconClass[0].classList.contains(timesClass)) {
            miniChatMenuIconClass[0].setAttribute('src', timesImage);
        } else {
            miniChatMenuIconClass[0].setAttribute('src', envelopeImage);
        }
    });

    document.getElementById('mini-chat-menu').addEventListener('mousedown', function(event) {
        event.preventDefault();
    }, false);
}
