var config = {
    link: "http://example.com"
}

initMiniChat(config);

function initMiniChat(config) {
    var head = document.head;
    var externalCss = document.createElement('link');

    externalCss.href = 'http://localhost:3000/public/css/chat.css';
    externalCss.rel = 'stylesheet';

    // Then bind the event to the activate function.
    // There are several events for cross browser compatibility.
    var callback = activate(config);

    externalCss.onreadystatechange = callback;
    externalCss.onload = callback;

    head.appendChild(externalCss);
}

function activate(config) {
    var miniChatContainer = document.createElement('div');
    miniChatContainer.setAttribute('class', 'mini-chat-container');

    var miniChatHtml =
    '<div class="mini-chat-pane">' +
      '<iframe class="mini-chat-iframe" src="' + config.link + '"></iframe>' +
    '</div>' +
    '<div class="mini-chat-menu" id="mini-chat-menu">' +
      '<img class="mini-chat-life-ring-icon mini-chat-menu-icon">' +
    '</div>';

    miniChatContainer.innerHTML = miniChatHtml;

    var icon = 'mini-chat-life-ring-icon';
    var iconReplace = 'mini-chat-times-icon';
    var miniChatMenuIconClass = document.getElementsByClassName('mini-chat-menu-icon');
    var miniChatPaneClass = document.getElementsByClassName('mini-chat-pane');
    var miniChatMenuClass = document.getElementsByClassName('mini-chat-menu');

    var lifeRing = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB3aWR0aD0iMTc5MiIgaGVpZ2h0PSIxNzkyIiB2aWV3Qm94PSIwIDAgMTc5MiAxNzkyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik04OTYgMHExODIgMCAzNDggNzF0Mjg2IDE5MSAxOTEgMjg2IDcxIDM0OC03MSAzNDgtMTkxIDI4Ni0yODYgMTkxLTM0OCA3MS0zNDgtNzEtMjg2LTE5MS0xOTEtMjg2LTcxLTM0OCA3MS0zNDggMTkxLTI4NiAyODYtMTkxIDM0OC03MXptMCAxMjhxLTE5MCAwLTM2MSA5MGwxOTQgMTk0cTgyLTI4IDE2Ny0yOHQxNjcgMjhsMTk0LTE5NHEtMTcxLTkwLTM2MS05MHptLTY3OCAxMTI5bDE5NC0xOTRxLTI4LTgyLTI4LTE2N3QyOC0xNjdsLTE5NC0xOTRxLTkwIDE3MS05MCAzNjF0OTAgMzYxem02NzggNDA3cTE5MCAwIDM2MS05MGwtMTk0LTE5NHEtODIgMjgtMTY3IDI4dC0xNjctMjhsLTE5NCAxOTRxMTcxIDkwIDM2MSA5MHptMC0zODRxMTU5IDAgMjcxLjUtMTEyLjV0MTEyLjUtMjcxLjUtMTEyLjUtMjcxLjUtMjcxLjUtMTEyLjUtMjcxLjUgMTEyLjUtMTEyLjUgMjcxLjUgMTEyLjUgMjcxLjUgMjcxLjUgMTEyLjV6bTQ4NC0yMTdsMTk0IDE5NHE5MC0xNzEgOTAtMzYxdC05MC0zNjFsLTE5NCAxOTRxMjggODIgMjggMTY3dC0yOCAxNjd6IiBmaWxsPSIjZmZmIi8+PC9zdmc+";
    var times = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB3aWR0aD0iMTc5MiIgaGVpZ2h0PSIxNzkyIiB2aWV3Qm94PSIwIDAgMTc5MiAxNzkyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0xNDkwIDEzMjJxMCA0MC0yOCA2OGwtMTM2IDEzNnEtMjggMjgtNjggMjh0LTY4LTI4bC0yOTQtMjk0LTI5NCAyOTRxLTI4IDI4LTY4IDI4dC02OC0yOGwtMTM2LTEzNnEtMjgtMjgtMjgtNjh0MjgtNjhsMjk0LTI5NC0yOTQtMjk0cS0yOC0yOC0yOC02OHQyOC02OGwxMzYtMTM2cTI4LTI4IDY4LTI4dDY4IDI4bDI5NCAyOTQgMjk0LTI5NHEyOC0yOCA2OC0yOHQ2OCAyOGwxMzYgMTM2cTI4IDI4IDI4IDY4dC0yOCA2OGwtMjk0IDI5NCAyOTQgMjk0cTI4IDI4IDI4IDY4eiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==";

    document.body.appendChild(miniChatContainer);

    // Set life ring icon
    miniChatMenuIconClass[0].setAttribute('src', lifeRing);

    document.getElementById('mini-chat-menu').addEventListener('click', function () {
        miniChatMenuIconClass[0].classList.value = miniChatMenuIconClass[0].classList.value.replace(icon, iconReplace);
        miniChatPaneClass[0].classList.toggle('show');
        miniChatPaneClass[0].children[0].classList.toggle('show');
        miniChatMenuClass[0].classList.toggle('show');

        if (miniChatMenuIconClass[0].classList.contains('mini-chat-times-icon')) {
            miniChatMenuIconClass[0].setAttribute('src', times);
        } else {
            miniChatMenuIconClass[0].setAttribute('src', lifeRing);
        }

        var temp = iconReplace;
        iconReplace = icon;
        icon = temp;
    });

    document.getElementById('mini-chat-menu').addEventListener('mousedown', function(event) {
        event.preventDefault();
    }, false);
}
