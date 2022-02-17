import Vue from 'vue';
import moment from 'moment';

moment.locale('id');

Vue.filter('date', function (value) {
  if (!value) return '';
  const localTime = moment.utc(value).toDate();
  return moment(localTime).format('D MMM, YYYY', 'id');
});

Vue.filter('time', function (value) {
  if (!value) return '';
  const localTime = moment.utc(value).toDate();
  return moment(localTime).format('HH:mm', 'id');
});

Vue.filter('datetime', function (value) {
  if (!value) return '';
  const localTime = moment.utc(value).toDate();
  return moment(localTime).format('DD/MM/YYYY - HH:mm', 'id');
});

Vue.filter('dateclock', function (value) {
  if (!value) return '';
  const localTime = moment.utc(value).toDate();
  return moment(localTime).format('dddd, MM/DD  HH:mm:ss', 'id');
});

Vue.filter('day', function (value) {
  if (!value) return '';
  return moment(value).format('DD', 'id');
});

Vue.filter('month', function (value) {
  if (!value) return '';
  return moment(value).format('MMMM', 'id');
});

Vue.filter('year', function (value) {
  if (!value) return '';
  return moment(value).format('YYYY', 'id');
});

Vue.filter('millis', function (value) {
  let sec = Math.floor(value / 1000);
  let hrs = Math.floor(sec / 3600);
  sec -= hrs * 3600;
  let min = Math.floor(sec / 60);
  sec -= min * 60;

  sec = '' + sec;
  sec = ('00' + sec).substring(sec.length);
  if (hrs > 0) {
    min = '' + min;
    min = ('00' + min).substring(min.length);
    if (min > 0 && sec > 0) {
      return hrs + ' jam ' + min + ' menit ' + sec + ' detik ';
    } else if (min > 0 && sec < 1) {
      return hrs + ' jam ' + min + ' menit ';
    } else if (min < 1 && sec < 1) {
      return hrs + ' jam ';
    }
  } else if (min > 0) {
    if (sec > 0) {
      return min + ' menit ' + sec + ' detik ';
    } else {
      return min + ' menit ';
    }
  } else {
    return sec + ' detik ';
  }
});

Vue.filter('price', (num) => {
  if (isNaN(num)) return 'Not a Number';
  const decimals = 0;
  const decPoint = ',';
  const thousandsSep = '.';
  num = (num + '').replace(/[^0-9+\-Ee.]/g, '');
  const n = !isFinite(+num) ? 0 : +num;
  const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
  const sep = typeof thousandsSep === 'undefined' ? ',' : thousandsSep;
  const dec = typeof decPoint === 'undefined' ? '.' : decPoint;
  let s = '';

  const toFixedFix = function (n, prec) {
    const k = Math.pow(10, prec);
    return '' + (Math.round(n * k) / k).toFixed(prec);
  };

  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return `Rp. ${s.join(dec)}`;
});

Vue.filter('number', (num) => {
  if (isNaN(num)) return 'Not a Number';
  const decimals = 0;
  const decPoint = ',';
  const thousandsSep = '.';
  num = (num + '').replace(/[^0-9+\-Ee.]/g, '');
  const n = !isFinite(+num) ? 0 : +num;
  const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
  const sep = typeof thousandsSep === 'undefined' ? ',' : thousandsSep;
  const dec = typeof decPoint === 'undefined' ? '.' : decPoint;
  let s = '';

  const toFixedFix = function (n, prec) {
    const k = Math.pow(10, prec);
    return '' + (Math.round(n * k) / k).toFixed(prec);
  };

  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return `${s.join(dec)}`;
});

Vue.filter('phone', function (value) {
  if (!value) return '';
  return value.substring(0, 4) + ' - XXXX - XXXX';
});

Vue.filter('email', function (value) {
  if (!value) return '';
  return value.substring(0, 5) + '@XXXXX';
});

Vue.filter('address', function (value) {
  if (!value) return '';
  return value.substring(0, 20) + ' . . .';
});

Vue.filter('title', function (value) {
  if (!value) return '';
  if (value.length > 30) {
    return value.substring(0, 30) + ' . . .';
  }
  return value;
});

export default {
  moment,
};
