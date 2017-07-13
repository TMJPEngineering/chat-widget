var config = {
    link: "http://example.com"
}

initMiniChat(config);

function initMiniChat(config) {
    var head = document.head;
    var fontAwesome = document.createElement('link');
    var externalCss = document.createElement('link');

    fontAwesome.href = 'http://localhost:3000/bower_components/font-awesome/css/font-awesome.css';
    fontAwesome.rel = 'stylesheet';
    externalCss.href = 'http://localhost:3000/public/css/chat.css';
    externalCss.rel = 'stylesheet';

    // Then bind the event to the activate function.
    // There are several events for cross browser compatibility.
    var callback = activate(config);

    fontAwesome.onreadystatechange = callback;
    fontAwesome.onload = callback;
    externalCss.onreadystatechange = callback;
    externalCss.onload = callback;

    head.appendChild(fontAwesome);
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
      '<i class="fa fa-life-ring fa-2x mini-chat-menu-icon" aria-hidden="true"></i>' +
    '</div>';

    miniChatContainer.innerHTML = miniChatHtml;

    var icon = 'fa-life-ring';
    var iconReplace = 'fa-times';
    var miniChatMenuIconClass = document.getElementsByClassName('mini-chat-menu-icon');
    var miniChatPaneClass = document.getElementsByClassName('mini-chat-pane');
    var miniChatMenuClass = document.getElementsByClassName('mini-chat-menu');

    document.body.appendChild(miniChatContainer);
    document.getElementById('mini-chat-menu').addEventListener('click', function () {
        miniChatMenuIconClass[0].classList.value = miniChatMenuIconClass[0].classList.value.replace(icon, iconReplace);
        miniChatPaneClass[0].classList.toggle('show');
        miniChatPaneClass[0].children[0].classList.toggle('show');
        miniChatMenuClass[0].classList.toggle('show');

        var temp = iconReplace;
        iconReplace = icon;
        icon = temp;
    });

    document.getElementById('mini-chat-menu').addEventListener('mousedown', function(event) {
        event.preventDefault();
    }, false);
}
