function toggleClass(s,a){if(s.classList)s.classList.toggle(a);else{var e=s.className.split(" "),l=e.indexOf(a);l>=0?e.splice(l,1):e.push(a),s.className=e.join(" ")}}function removeClass(s,a){s.classList?s.classList.remove(a):s.className=s.className.replace(new RegExp("(^|\\b)"+a.split(" ").join("|")+"(\\b|$)","gi")," ")}function addClass(s,a){s.classList?s.classList.add(a):s.className+=" "+a}function hasClass(s,a){return s.classList?s.classList.contains(a):new RegExp("(^| )"+a+"( |$)","gi").test(s.className)}function isEmpty(s){return 0===s.length||!s.trim()}