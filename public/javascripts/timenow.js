/////////////// Common - Start ////////////////////////////////
//var countries = new Array();
//var zones = new Array();
function setLocationStorage(countries,zones) {
    if (window.localStorage.getItem('countries') == null) {
        window.localStorage.setItem('countries', JSON.stringify( countries));
        window.localStorage.setItem('zones', JSON.stringify(zones));
    }
}
function getLocationStorage() {
    if (window.localStorage.getItem('countries') != null) {
        countries = JSON.parse(window.localStorage.getItem('countries'));
        zones = JSON.parse(JSON.parse(window.localStorage.getItem('zones')));
    }
}

var indexs = new Array();
var _pages = window.location.href.toLocaleLowerCase().split('/');
var _currentPage = _pages[_pages.length - 1];
var timeZonee = Intl.DateTimeFormat().resolvedOptions().timeZone;
var months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
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
function getDayOfTheWeek(date) {
    //var a = new Date();
    var weekdays = new Array(7);
    weekdays[0] = "Sunday";
    weekdays[1] = "Monday";
    weekdays[2] = "Tuesday";
    weekdays[3] = "Wednesday";
    weekdays[4] = "Thursday";
    weekdays[5] = "Friday";
    weekdays[6] = "Saturday";
    return weekdays[date.getDay()];
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


//var currentDay = new Date(). 
var currentTimeZoneCountries = [];
function updateTime() {
    //var _currentDateTime = new Date().toLocaleString("en-US", { minute: '2-digit', second: 'numeric', timeZone: timeZonee, timeZoneName: 'short' }).split(',');
    if (_currentPage == 'home' || _currentPage == '') {
        var _currentDateTime = new Date().toLocaleString("en-US", { timeZone: timeZonee }).split(',');
        //document.getElementById('currentDate').innerText = _currentDateTime[0];
        document.getElementById('currentTime').innerText = _currentDateTime[1];
    }
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
    $('#main-cities-times-wrapper').html('');
    for (var i = 0; i < _mainCities.length; i++) {
        var _time = new Date().toLocaleString("en-US", { timeZone: _mainCities[i].timezone }).split(',');
        var _mainCity = '<div class="main-cities-times" id="mainCity' + i + '"><h4>' + _mainCities[i].city + ' <small>' + _mainCities[i].country + '</small></h4> <h5>' + _time + '</h5></div>'
        $('#main-cities-times-wrapper').append(_mainCity);
    }
    $('#main-cities-times-wrapper').height($('#timezone-map-wrapper').height());
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

/////////////// Namaz Timing Page - Start ////////////////////////////////

function loadNamazTimings() {
    $('.select2').select2();
    getLocationStorage();
    loadTimeZone();
    var _latLong = getLatLongByTimeZone(timeZonee);
    var sel = document.getElementById('countries');
    var fragment = document.createDocumentFragment();
    //countries.forEach(function (country, index) {
    //    var opt = document.createElement('option');
    //    opt.innerHTML = country.name;
    //    opt.value = country.timezone;
    //    fragment.appendChild(opt);
    //});
    //sel.appendChild(fragment);
    indexs = Object.keys(countries);
    var _zones = new Array();
    for (const index of indexs) {
        var keys = Object.keys(countries[index]);
        for (const key of keys) {
            for (var k = 0; k < countries[index][key].zones.length; k++) {
                    var opt = document.createElement('option');
                for (var i = 0; i < countries[index][key].zones.length; i++) {
                    //var _zones = countries[index][key].name + ' - ' + countries[index][key].zones[i];
                    var _zone = countries[index][key].zones[i];
                    if (_zones.indexOf(_zone) == -1) {
                        _zones.push(_zone);
                        opt.innerHTML = _zone;
                        opt.value = countries[index][key].timezone;
                        if (countries[index][key].zones[i] == timeZonee) {
                            opt.selected = true;
                        }
                        fragment.appendChild(opt);
                        }
                }
            }
        }
    }
    sel.appendChild(fragment);
    loadNamazTableForToday(_latLong);
    loadNamazTableForMonth(_latLong);
    //if (navigator.geolocation) {
    //    navigator.geolocation.getCurrentPosition(loadNamazTableForToday);
    //    navigator.geolocation.getCurrentPosition(loadNamazTableForMonth);
    //}
}

function loadNamazTableForToday(position) {
    prayTimes.setMethod('Karachi');
    var date = new Date(); // today
    var times = prayTimes.getTimes(date, [position.lat, position.long]);
    var list = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha', 'Midnight'];
    document.getElementById('selectedTodayNamazTiming').innerText = 'Namaz Timing today ( ' + getFullDate(new Date()) + ' )';
    var html = '<table id="timetable">';
    //html += '<tr><th colspan="6">' + getFullDate(new Date()) + '</th></tr>';
    html += '<tr class="d-flex">';
    for (var i in list) {
        html += '<td class="col-2 bold">' + list[i] + '</td>';
    }
    html += '</tr>';
    html += '<tr class="d-flex">';
    for (var i in list) {
        html += '<td class="col-2">' + times[list[i].toLowerCase()] + '</td>';
    }
    html += '</tr>';
    html += '</table>';
    document.getElementById('tblNamazTimeToday').innerHTML = html;
}

function loadNamazTableForMonth(position) {
    prayTimes.setMethod('Karachi');
    _todayDate = new Date();
    var _currentMonth = _todayDate.getMonth() ;
    var _currentYear = _todayDate.getFullYear();
    document.getElementById('selectedMonthNamazTiming').innerText = 'Namaz Timing for ' + months[_currentMonth] + ', ' + _currentYear;
    var _totalDays = new Date(_currentYear, (_currentMonth + 1), 0).getDate();
    var date = new Date(); // today

    var list = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha', 'Midnight'];
    var html = '<table id="timetable">';
    //html += '<tr><th colspan="2">' + getFullDate(new Date()) + '</th></tr>';
    html += '<tr class="d-flex text-center">';
    html += '<td class="col-2 bold">Gregorian Year</td>';
    html += '<td class="col-7 bold ">Prayers time</td>';
    html += '<td class="col-3 bold">Hijri Year</td>';
    html += '</tr>';
    html += '<tr class="d-flex">';
    html += '<td class="col-1 bold">' + months[_currentMonth] + '</td>';
    html += '<td class="col-1 bold">Day</td>';
    for (var i in list) {
        html += '<td class="col-1 bold">' + list[i] + '</td>';
    }
    html += '<td class="col-1 bold">Hijri</td>';
    html += '<td class="col-1 bold">Month</td>';
    html += '<td class="col-1 bold">Year</td>';
    html += '</tr>';
    for (var i = 1; i <= _totalDays; i++) {
        var _date = new Date(_currentYear, _currentMonth,i);
        var times = prayTimes.getTimes(date, [position.lat, position.long]);
        var _islamicDay = new Intl.DateTimeFormat('en-SA-u-ca-islamic', { day: 'numeric', }).format(_date);
        var _islamicMonth = new Intl.DateTimeFormat('en-SA-u-ca-islamic', { month: 'long' }).format(_date);
        var _islamicYear = new Intl.DateTimeFormat('en-SA-u-ca-islamic', { year: 'numeric' }).format(_date);
        html += '<tr class="d-flex">';
        html += '<td class="col-1">' + i + '</td>';
        html += '<td class="col-1">' + getDayOfTheWeek(_date) + '</td>';
      
        
        for (var k in list) {
            html += '<td class="col-1">' + times[list[k].toLowerCase()] + '</td>';
        }
        html += '<td class="col-1">' + _islamicDay + '</td>';
        html += '<td class="col-1">' + _islamicMonth + '</td>';
        html += '<td class="col-1">' + _islamicYear + '</td>';
        html += '</tr>';
    }
    html += '</table>';
    document.getElementById('tblNamazTimeForMonth').innerHTML = html;
}


/////////////// Namaz Timing Page - End ////////////////////////////////

/////////////// Currency Converter Page - Start ////////////////////////////////

function convert() {
    var _amount = $('#txtAmount').val();
    var _fromCurrency = $('#drpFromCurrency').val();
    var _toCurrency = $('#drpToCurrency').val();
    $.ajax({
        type: 'get',
        url: '/convertCurrency?amount=' + _amount + '&fromCurrency=' + _fromCurrency + '&toCurrency=' + _toCurrency,
        success: function (data) {
            var _convertedAmount = Math.round((data * _amount) * 100) / 100;
            $('#convertedAmount').text(_amount + ' ' + _fromCurrency + ' = ' + _convertedAmount + ' ' + _toCurrency);
            $('#todaysRate').text('1 ' + _fromCurrency + ' = ' + data + ' ' + _toCurrency);
        }
    });
}
function InitCurrencyConverter() {
    $('.first-currency-detail, .second-currency-detail').addClass('hidden');
    $('.select2').select2();
}
function getCurrencyByID(currencyID) {
   return $.ajax({
        type: 'get',
        url: '/getCurrencyByID?currencyID=' + currencyID
    });
}

function showFromCurrencyDetail() {
    $('.first-currency-detail').removeClass('hidden');
    var _currencyID = $('#drpFromCurrency option:selected')[0].value;
    getCurrencyByID(_currencyID).done(function (currency) {
        $('#spnFirstCurrencyCountryName').text(currency.name);
        $('#spnFirstCurrencyCountryShortForm').text(currency.alpha3);
        $('#spnFirstCurrencyName').text(currency.currencyName);
        $('#spnFirstCurrencyShortForm').text(currency.currencyId);
        $('#spnFirstCurrencySymbol').text(currency.currencySymbol);
    });
}
function showToCurrencyDetail() {
    $('.second-currency-detail').removeClass('hidden');
    var _currencyID = $('#drpToCurrency option:selected')[0].value;
    getCurrencyByID(_currencyID).done(function (currency) {
        $('#spnSecondCurrencyCountryName').text(currency.name);
        $('#spnSecondCurrencyCountryShortForm').text(currency.alpha3);
        $('#spnSecondCurrencyName').text(currency.currencyName);
        $('#spnSecondCurrencyShortForm').text(currency.currencyId);
        $('#spnSecondCurrencySymbol').text(currency.currencySymbol);
    });
   
}

/////////////// Currency Converter Page - End ////////////////////////////////