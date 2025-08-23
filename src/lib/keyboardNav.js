export function createKeyboardNav(nodes) {
  let focusedIndex = 0;

  return {
    init,
    destroy,
  };

  function init() {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('onload', onload);
    document.addEventListener('focus', onload);
  }

  function destroy() {
    document.removeEventListener('keydown', handleKeyDown);
    document.removeEventListener('onload', onload);
    document.removeEventListener('focus', onload);
  }

  function handleKeyDown(event) {
    if (['ArrowDown', 'ArrowUp', 'Enter'].includes(event.key)) {
      event.preventDefault();
    }

    if (event.key === 'Enter') {
      nodes[focusedIndex]?.click();
      return;
    }

    if (event.key === 'ArrowDown' && focusedIndex < nodes.length - 1) {
      focusedIndex++;
    }
    else if (event.key === 'ArrowUp' && focusedIndex > 0) {
      focusedIndex--;
    }

    focus(focusedIndex);
  }

  function focus(index) {
    nodes[index]?.focus();
  }

  function onload() {
    if (document.activeElement === document.body) {
      focus(focusedIndex);
    }
  }
}
