function toggleClass(s,l){if(s.classList)s.classList.toggle(l);else{var a=s.className.split(" "),e=a.indexOf(l);e>=0?a.splice(e,1):a.push(l),s.className=a.join(" ")}}