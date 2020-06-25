/////////////// Common - Start ////////////////////////////////

var _mainCities = [
    { 'city': 'New York', 'country': 'United States of America', 'timezone': 'America/New_York' },
    { 'city': 'London', 'country': 'Britain (UK)', 'timezone': 'Europe/London' },
    { 'city': 'Paris', 'country': 'France', 'timezone': 'Europe/Paris' },
    { 'city': 'Tokyo', 'country': 'Japan', 'timezone': 'Asia/Tokyo' },
    { 'city': 'Hong Kong', 'country': 'Hong Kong', 'timezone': 'Asia/Hong_Kong' },
    { 'city': 'Singapore', 'country': 'Singapore', 'timezone': 'Asia/Singapore' },
    { 'city': 'Beijing', 'country': 'China', 'timezone': 'Asia/Shanghai' },
    { 'city': 'Sydney', 'country': 'Australia', 'timezone': 'Australia/Sydney' },
    { 'city': 'Berlin', 'country': 'Germany', 'timezone': 'Europe/Berlin' },
    { 'city': 'Toronto', 'country': 'Canada', 'timezone': 'America/Toronto' },
];
function getFullDate(objToday) {
    var weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
        dayOfWeek = weekday[objToday.getDay()],
        domEnder = function () { var a = objToday; if (/1/.test(parseInt((a + "").charAt(0)))) return "th"; a = parseInt((a + "").charAt(1)); return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : "th" }(),
        dayOfMonth = (objToday.getDate() < 10) ? '0' + objToday.getDate() + domEnder : objToday.getDate() + domEnder,
        months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
        curMonth = months[objToday.getMonth()],
        curYear = objToday.getFullYear(),
        curHour = objToday.getHours() > 12 ? objToday.getHours() - 12 : (objToday.getHours() < 10 ? "0" + objToday.getHours() : objToday.getHours()),
        curMinute = objToday.getMinutes() < 10 ? "0" + objToday.getMinutes() : objToday.getMinutes(),
        curSeconds = objToday.getSeconds() < 10 ? "0" + objToday.getSeconds() : objToday.getSeconds(),
        curMeridiem = objToday.getHours() > 12 ? "PM" : "AM";
        //var today = curHour + ":" + curMinute + "." + curSeconds + curMeridiem + " " +
        return dayOfWeek + " " + dayOfMonth + " of " + curMonth + ", " + curYear;
}
function getDayOfTheWeek() {
        var a = new Date();
        var weekdays = new Array(7);
        weekdays[0] = "Sunday";
        weekdays[1] = "Monday";
        weekdays[2] = "Tuesday";
        weekdays[3] = "Wednesday";
        weekdays[4] = "Thursday";
        weekdays[5] = "Friday";
        weekdays[6] = "Saturday";
        return weekdays[a.getDay()];
}
function getDayOfTheYear() {
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = now - start;
    var oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}
Date.prototype.getWeekOfTheMonth = function () {
    var firstDay = new Date(this.getFullYear(), this.getMonth(), 1).getDay();
    return Math.ceil((this.getDate() + firstDay) / 7);
}
Date.prototype.getWeekOfTheYear = function () {
    var onejan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
}
function getTimeByCountry(country) {
    var _times = ''; var _timesArray = new Array();
    for (const index of indexs) {
        var keys = Object.keys(countries[index]);
        for (const key of keys) {
            if (countries[index][key].name.toLowerCase() == country.toLowerCase()) {
                for (var k = 0; k < countries[index][key].zones.length; k++) {
                    var _currentDateTime = new Date().toLocaleString("en-US", { timeZone: countries[index][key].zones[k] }).split(',');
                    if (_timesArray.indexOf(_currentDateTime[1]) == -1) {
                        _times += '\n' + countries[index][key].zones[k] + ' : ' + _currentDateTime[1];
                        _timesArray.push(_currentDateTime[1]);
                    }
                }
            }
        }
    }
    return _times;
}
function getLatLongByTimeZone(timeZone) {
    var zoneindexs = Object.keys(zones);
    for (const index of zoneindexs) {
        if (zones[index].name.toLowerCase() == timeZone.toLowerCase()) {
            return zones[index];
        }
    }
}

/////////////// Common - End ////////////////////////////////

// Analog Clock - Start
function drawClock(ctx, radius) {
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
    var grad;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    grad.addColorStop(0, '#333');
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, '#333');
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();
}

function drawNumbers(ctx, radius) {
    var ang;
    var num;
    ctx.font = radius * 0.15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for (num = 1; num < 13; num++) {
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);
    }
}

function drawTime(ctx, radius) {
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    //hour
    hour = hour % 12;
    hour = (hour * Math.PI / 6) +
        (minute * Math.PI / (6 * 60)) +
        (second * Math.PI / (360 * 60));
    drawHand(ctx, hour, radius * 0.5, radius * 0.07);
    //minute
    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    drawHand(ctx, minute, radius * 0.8, radius * 0.07);
    // second
    second = (second * Math.PI / 30);
    drawHand(ctx, second, radius * 0.9, radius * 0.02);
}

function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}
// Analog Clock - End

// Hijri Date - Start


// Hijri Date - End


/////////////// Index Page - Start ////////////////////////////////

//document.getElementById('timeZone').innerText = moment.tz.guess();
//var timez = Intl.DateTimeFormat().resolvedOptions();
var timeZonee = Intl.DateTimeFormat().resolvedOptions().timeZone;

//var currentDay = new Date(). 
var currentTimeZoneCountries = [];
function updateTime() {
    //var _currentDateTime = new Date().toLocaleString("en-US", { minute: '2-digit', second: 'numeric', timeZone: timeZonee, timeZoneName: 'short' }).split(',');
    var _currentDateTime = new Date().toLocaleString("en-US", {  timeZone: timeZonee }).split(',');
    //document.getElementById('currentDate').innerText = _currentDateTime[0];
    document.getElementById('currentTime').innerText = _currentDateTime[1];
}
setInterval(updateTime, 1000);
setInterval(updateMainCitiesTime, 1000);

//var mymap = L.map('map').setView([51.505, -0.09], 13);
//mapboxgl.accessToken = 'pk.eyJ1IjoiYWRpbDMyMSIsImEiOiJjazQ2dXc0NGcwbWQwM21qdG1hbHozejY2In0.XhKAYb0QWgvFBvjsrMTjng';

//var map = new mapboxgl.Map({
//  container: 'map', //this is the id of the container you want your map in
//  style: 'mapbox://styles/mapbox/streets-v11', // this controls the style of the map. Want to see more? Try changing 'light' to 'simple'. 
//  minZoom: 2 // We want our map to start out pretty zoomed in to start.
//});




function ready(error, world, names) {
    if (error) throw error;
    var countries1 = topojson.feature(world, world.objects.countries).features;
    var countries = countries1.filter(function (d) {
        return names.some(function (n) {
            if (d.id == n.id) return d.name = n.name;
        })
    });
    svg.selectAll("path")
        .data(countries)
        .enter()
        .append("path")
        .attr("stroke", "gray")
        .attr("stroke-width", 1)
        .attr("fill", "white")
        .attr("d", path)
        .on("mouseover", function (d, i) {
            //d3.select(this).attr("fill","grey").attr("stroke-width",2);
            var _timeZones = getTimeByCountry(d.name);
            tooltip.classed("hidden", false).html(d.name + _timeZones);
        })
        .on("mousemove", function (d) {
            var _timeZones = getTimeByCountry(d.name);
            tooltip.classed("hidden", false)
                .style("top", ((d3.event.offsetY + 15)) + "px")
                .style("left", (d3.event.offsetX + 15) + "px")
                .html(d.name + _timeZones);
        })
        .on("mouseout", function (d, i) {
            //d3.select(this).attr("fill","white").attr("stroke-width",1);
            tooltip.classed("hidden", true);
        });

    loadTimeZone();
    loadDates();
    loadAnalogClock();
    loadMainCitiesTime();
    highlightTimeZone();
    loadSunTiming();

};
function loadTimeZone() {
    var _fullTimeZoneName = new Date().toLocaleString("en-US", { timeZoneName: 'long', timeZone: timeZonee }).split(' ');
    var _shortTimeZoneName = new Date().toLocaleString("en-US", { timeZoneName: 'short' }).split(' ');
    _fullTimeZoneName.splice(0, 3);
    var _timezoneName = timeZonee + ' , ' + _fullTimeZoneName.toString().replace(',', ' ').replace(',', ' ') + ' (' + _shortTimeZoneName[_shortTimeZoneName.length - 1] + ')';
    document.getElementById('timeZone').innerText = _timezoneName;
}
function loadAnalogClock() {
    var canvas = document.getElementById("cvsAnalogClock");
    canvas.width = $('#cvsAnalogClock').parent('div').width();
    canvas.height = canvas.width;
    var ctx = canvas.getContext("2d");
    var radius = canvas.height / 2;
    ctx.translate(radius, radius);
    radius = radius * 0.90;
    setInterval(function () { drawClock(ctx, radius); }, 1000);
    //setInterval(drawClock(ctx,radius), 1000);
}
function highlightTimeZone() {
    indexs = Object.keys(countries);
    for (const index of indexs) {
        var keys = Object.keys(countries[index]);
        for (const key of keys) {
            for (var k = 0; k < countries[index][key].zones.length; k++) {
                if (countries[index][key].zones[k].toLowerCase() == timeZonee.toLowerCase()) {
                    //country = timeZonee.split('/')[1];
                    currentTimeZoneCountries.push(countries[index][key].name);
                }
            }
        }
    }
    var currentTimeZoneCountriesString = '';
    for (let i = 0; i < currentTimeZoneCountries.length; i++) {
        currentTimeZoneCountriesString += (i + 1) + ' : ' + currentTimeZoneCountries[i] + '\n';
    }
    $('svg g path').each(function () {
        //console.log($(this)[0].__data__.name );
        if (currentTimeZoneCountries.indexOf($(this)[0].__data__.name) > -1) {
            $(this).attr("fill", "grey").attr("stroke-width", 2);
        }
    });
    $('.currentTimeZoneCountries').text(currentTimeZoneCountriesString);
    //$('body').append('<div class="tooltip-timezone" style="top:' + ($('svg g path[fill="grey"]').offset().top - 50) + 'px;">' + currentTimeZoneCountriesString + '</div>');
    //$('.tooltip-timezone').css('left', ($('svg g path[fill="grey"]').offset().left - ($('.tooltip-timezone').width() / 2)) + 'px');
    
}
function loadDates() {
    $('#currentDate').text(getFullDate(new Date()));
    $('#currentWeekOfMonth').text(new Date().getWeekOfTheMonth());
    $('#currentWeekOfYear').text(new Date().getWeekOfTheYear());
    $('#currentDayOfYear').text(getDayOfTheYear());
    //$('#currentDay').text(' ' +  _currentDayOfTheWeek + ' , Week of The Month : ' + _currentWeekOfTheMonth + ' , Week of The Year : ' + _currentWeekOfTheYear);
    $('#currentIslamicDateAr').text(new Intl.DateTimeFormat('ar-SA-u-ca-islamic', { day: 'numeric', month: 'long', weekday: 'long', year: 'numeric' }).format(Date.now()));
    $('#currentIslamicDateEn').text(new Intl.DateTimeFormat('en-SA-u-ca-islamic', { day: 'numeric', month: 'long', weekday: 'long', year: 'numeric' }).format(Date.now()));
    m = moment(new Intl.DateTimeFormat('en-SA-u-ca-islamic').format(Date.now()), 'iM/iD/iYYYY'); // Parse a Hijri date.
    //m.format('iYYYY/iM/iD [is] YYYY/M/D'); // 1410/8/28 is 1990/3/25
    var year =  m.iYear(); // 1410
    var month = m.iMonth(); // 7
    var date = m.iDate(); // 28
    var dayofyear = m.iDayOfYear(); // 236
    var week = m.iWeek(); // 35
    var weekofyear = m.iWeekYear(); // 1410
    $('#currentWeekOfMonthAr').text(month);
    $('#currentWeekOfYearAr').text(week);
    $('#currentDayOfYearAr').text(dayofyear);
}
function loadMainCitiesTime() {
    $('#main-cities-times-warapper').html('');
    for (var i = 0; i < _mainCities.length; i++) {
        var _time = new Date().toLocaleString("en-US", { timeZone: _mainCities[i].timezone }).split(',');
        var _mainCity = '<div class="main-cities-times" id="mainCity' + i + '"><h4>' + _mainCities[i].city + ' <small>' + _mainCities[i].country + '</small></h4> <h5>' + _time + '</h5></div>'
        $('#main-cities-times-warapper').append(_mainCity);
    }
    $('#main-cities-times-warapper').height($('#timezone-map-wrapper').height());
}
function updateMainCitiesTime() {
    for (var i = 0; i < _mainCities.length; i++) {
        var _time = new Date().toLocaleString("en-US", { timeZone: _mainCities[i].timezone });
        $('.main-cities-times#mainCity' + i + ' h5').text(_time);
    }
}

/* Sun timing-start*/
function loadSunTiming() {
    var _zone = getLatLongByTimeZone(timeZonee);
    var zone = SunCalc.getTimes(/*Date*/ new Date(), /*Number*/ _zone.lat, /*Number*/ _zone.long, /*Number (default=0)*/ 0);
    $('#sunRiseTime').text(zone.sunrise.toLocaleTimeString());
    $('#sunSetTime').text(zone.sunset.toLocaleTimeString());
}



/* Sun timing-end*/
//var offset = 0;
//var count = $(".slide-item-wrapper > * > *").length;
//window.setInterval(
//    function () {
//        offset = (offset - 104) % (count * 104); // 104px div height (incl margin)
//        $(".slide-item-wrapper > *").css({
//            "transform": "translateY(" + offset + "px)",
//        });
//    }, 3000);
/////////////// Index Page - End ////////////////////////////////