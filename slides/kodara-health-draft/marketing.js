(() => {
  const slide = document.querySelector('#launch');
  const library = slide.querySelector('.research-grid');
  const feed = slide.querySelector('.prospect-feed');
  const activity = slide.querySelector('.pause-activity');
  const status = slide.querySelector('.library-status');
  const finding = slide.querySelector('.pattern-finding p');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const activePhotos = new Set();
  let nextPhoto = 0;
  // ponytail: a bounded illustrative library/feed, not a live data integration.
  const records = [
    ['Ad', 'Your back notices the workday.', 'An angle built around desk discomfort.', 'Desk discomfort', 'ad'],
    ['Organic', 'Three habits at your desk', 'Small changes that fit a working day.', 'Desk discomfort', 'post'],
    ['Email', 'A routine for your workday', 'What would fit around your schedule?', 'Desk discomfort', 'email'],
    ['Google search', 'Back discomfort at a desk', 'Search-interest pattern', 'Desk discomfort', 'search'],
    ['Ad', 'Long shift. Tired feet.', 'A familiar problem for people on their feet.', 'Shift workers', 'ad'],
    ['Organic', 'The physical side of new parenthood', 'Carrying, lifting, and finding support.', 'New parents', 'post'],
    ['Email', 'When sitting catches up with you', 'A program that fits between meetings.', 'Desk discomfort', 'email'],
    ['Google search', 'Support after a long shift', 'Search-interest pattern', 'Shift workers', 'search'],
    ['Organic', 'After a day on your feet', 'The routines people are asking about.', 'Shift workers', 'post'],
    ['Ad', 'Support for a new chapter', 'Everyday movement as a new parent.', 'New parents', 'ad'],
    ['Email', 'A little support for your routine', 'Making time around a new baby.', 'New parents', 'email'],
    ['Google search', 'Desk-friendly movement routines', 'Search-interest pattern', 'Desk discomfort', 'search']
  ];
  const names = ['Jordan Lee', 'Alex Morgan', 'Taylor Brooks', 'Casey Ellis', 'Jamie Parker', 'Riley Chen', 'Sam Rivera', 'Avery Lane', 'Cameron Reed', 'Drew Bennett'];
  const topics = ['Desk discomfort', 'Shift workers', 'New parents'];
  let nextRecord = 6, nextProspect = 6, phase = 0, timer = null, paused = false;
  let current = records[0];
  function text(tag, value, className) {
    const node = document.createElement(tag);
    node.textContent = value;
    if (className) node.className = className;
    return node;
  }
  function record(data) {
    const [kind, title, excerpt, topic, format] = data;
    const card = document.createElement('article');
    card.className = `research-record format-${format}`;
    const heading = text('div', '', 'record-heading');
    heading.append(text('span', kind), text('span', 'Indexed', 'record-state'));
    card.append(heading);
    const preview = document.createElement('div');
    preview.className = 'record-preview';
    if (format === 'ad') {
      // Keep every visible photo distinct within the 64-image illustrative atlas.
      while (activePhotos.has(nextPhoto)) nextPhoto = (nextPhoto + 1) % 64;
      const photo = text('span', '', 'signal-photo');
      photo.dataset.photo = nextPhoto;
      photo.style.backgroundPosition = `${(nextPhoto % 8) * 100 / 7}% ${Math.floor(nextPhoto / 8) * 100 / 7}%`;
      activePhotos.add(nextPhoto);
      nextPhoto = (nextPhoto + 1) % 64;
      preview.append(photo, text('strong', title));
    } else if (format === 'post') {
      preview.append(text('span', 'Health & wellness', 'post-author'), text('strong', title));
    } else if (format === 'email') {
      preview.append(text('span', 'Subject', 'email-subject'), text('strong', title), text('p', excerpt));
    } else {
      preview.append(text('strong', title));
      // A labeled illustrative data visualization; no measured values implied.
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 240 35');
      svg.setAttribute('role', 'img');
      svg.setAttribute('aria-label', 'Illustrative search-interest trend, not measured data');
      const line = document.createElementNS(svg.namespaceURI, 'polyline');
      line.setAttribute('points', '2,30 25,24 48,28 71,18 94,22 117,14 140,17 163,9 186,14 209,7 238,3');
      svg.append(line);
      preview.append(svg);
    }
    card.append(preview, text('div', topic, 'record-topic'));
    return card;
  }
  function prospect(name, topic, fresh = false) {
    const row = text('li', '', fresh ? 'feed-prospect newly-matched' : 'feed-prospect');
    row.append(text('span', name.split(' ').map(part => part[0]).join(''), 'feed-avatar'));
    const body = text('div', '', 'feed-person');
    body.append(text('strong', name), text('span', topic));
    row.append(body, text('span', fresh ? 'New match' : 'Program fit', 'feed-state'));
    return row;
  }
  for (let i = 0; i < 240; i++) library.append(record(records[i % records.length]));
  names.slice(0, 6).forEach((name, i) => feed.append(prospect(name, topics[i % topics.length])));
  function stop() {
    clearTimeout(timer);
    timer = null;
    slide.dataset.running = 'false';
  }
  function step() {
    if (phase === 0) {
      current = records[nextRecord++ % records.length];
      library.querySelectorAll('.new-record').forEach(card => card.classList.remove('new-record'));
      const batch = document.createDocumentFragment();
      for (let i = 0; i < 20; i++) {
        const outgoing = library.lastElementChild;
        const oldPhoto = outgoing.querySelector('.signal-photo');
        if (oldPhoto) activePhotos.delete(Number(oldPhoto.dataset.photo));
        outgoing.remove();
        const card = record(records[(nextRecord - 1 + i) % records.length]);
        card.classList.add('new-record');
        card.querySelector('.record-state').textContent = 'Indexing';
        batch.append(card);
      }
      nextRecord += 19;
      library.prepend(batch);
      status.textContent = `New ${current[0].toLowerCase()} added to the library`;
    } else if (phase === 1) {
      library.querySelectorAll('.new-record .record-state').forEach(state => { state.textContent = 'Tagged'; });
      status.textContent = `Topic identified: ${current[3].toLowerCase()}`;
    } else if (phase === 2) {
      library.firstElementChild.querySelector('.record-state').textContent = 'Connected';
      finding.textContent = `${current[3]} linked to a matching program.`;
      status.textContent = 'Connecting related buyer language';
    } else {
      feed.querySelectorAll('.newly-matched').forEach(row => {
        row.classList.remove('newly-matched');
        row.querySelector('.feed-state').textContent = 'Program fit';
      });
      feed.prepend(prospect(names[nextProspect++ % names.length], current[3], true));
      feed.lastElementChild.remove();
      status.textContent = 'A new prospect matched to your program';
    }
    phase = (phase + 1) % 4;
    timer = setTimeout(step, 800);
  }
  function sync() {
    stop();
    activity.disabled = motion.matches;
    activity.textContent = motion.matches ? 'Reduced motion' : paused ? 'Resume activity' : 'Pause activity';
    if (motion.matches) status.textContent = 'Research library · Static preview';
    else if (paused) status.textContent = 'Activity paused';
    if (!slide.hidden && !document.hidden && !paused && !motion.matches) {
      slide.dataset.running = 'true';
      status.textContent = 'Scanning the research library';
      timer = setTimeout(step, 800);
    }
  }
  activity.addEventListener('click', () => { paused = !paused; sync(); });
  addEventListener('health-slide-change', sync);
  document.addEventListener('visibilitychange', sync);
  motion.addEventListener('change', sync);
  sync();
})();
