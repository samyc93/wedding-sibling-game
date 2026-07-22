(() => {
  const replacements = new Map([
    ['Warming up the animals...', 'Warming up the beach crew...'],
    ['Find the odd animal', 'Find the odd beach visitor'],
    ['One visitor does not belong. Can you spot them?', 'One beach visitor does not belong. Can you spot them?'],
    ['The penguins are getting hungry...', 'The turtles are heading for the shore...'],
    ['Fish collector', 'Beach collector'],
    ['Drag the penguin left and right. Catch 12 fish. Every crab takes 1 fish away.', 'Drag the turtle left and right. Collect 12 shells. Every crab takes 1 shell away.'],
    ['Take your time to get ready', 'Take your time — there is no rush'],
    ['Opening one last page in the photo album...', 'Opening one last memory before the big reveal...'],
    ['Use your finger to wipe away the frost.', 'Use your finger to wipe away the sand.'],
    ['Wipe to reveal', 'Wipe the sand to reveal'],
    ['Mission accepted!', 'Best Man mission accepted!'],
    ['I honestly could not imagine the day without you.', 'I honestly could not imagine the day without you standing beside me.'],
    ['Wedding Party Unlocked', 'Best Man Unlocked'],
    ['Penguin Guide', 'Turtle Navigator'],
    ['Fish Feast', 'Beachcomber']
  ]);

  function personalise(root = document.body) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    for (const node of nodes) {
      let text = node.nodeValue;
      for (const [from, to] of replacements) text = text.replaceAll(from, to);
      text = text
        .replaceAll('🐧', '🐢')
        .replaceAll('🐟', '🐚');
      if (text !== node.nodeValue) node.nodeValue = text;
    }
  }

  personalise();
  const observer = new MutationObserver(records => {
    for (const record of records) {
      for (const node of record.addedNodes) {
        if (node.nodeType === Node.TEXT_NODE) personalise(node.parentNode || document.body);
        else if (node.nodeType === Node.ELEMENT_NODE) personalise(node);
      }
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();