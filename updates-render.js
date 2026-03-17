// Render activity log entries from UPDATES_DATA
(function() {
    var MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    function formatDate(dateStr) {
        var parts = dateStr.split('-');
        var day = parseInt(parts[2], 10);
        var month = MONTHS[parseInt(parts[1], 10) - 1];
        return day + ' ' + month;
    }

    function monthYear(dateStr) {
        var parts = dateStr.split('-');
        return MONTHS[parseInt(parts[1], 10) - 1] + ' ' + parts[0];
    }

    function renderEntry(item) {
        return '<div class="activity-entry">' +
            '<span class="activity-date">' + formatDate(item.date) + '</span>' +
            '<span class="activity-source" data-source="' + item.source + '">' + item.source + '</span>' +
            '<span class="activity-text">' + item.text + '</span>' +
            '</div>';
    }

    // Homepage: last 50 entries (data is already newest-first)
    var homeEl = document.getElementById('activity-log-home');
    if (homeEl) {
        var limit = Math.min(UPDATES_DATA.length, 50);
        var html = '';
        for (var i = 0; i < limit; i++) {
            html += renderEntry(UPDATES_DATA[i]);
        }
        homeEl.innerHTML = html;
    }

    // Full page: all entries grouped by month
    var fullEl = document.getElementById('activity-log-full');
    if (fullEl) {
        var html = '';
        var currentMonth = '';
        for (var i = 0; i < UPDATES_DATA.length; i++) {
            var item = UPDATES_DATA[i];
            var m = monthYear(item.date);
            if (m !== currentMonth) {
                currentMonth = m;
                html += '<div class="activity-month-heading">' + m + '</div>';
            }
            html += renderEntry(item);
        }
        fullEl.innerHTML = html;
    }
})();
