import Html from '../html';

describe('build div element', () => {
  test('simple', () => {
    const html = Html.tagOpen('div') + Html.tagClose('div');
    expect(html).toBe('<div></div>');
  });

  test('with attributes', () => {
    const attributes = {
      'data-id': '1',
      style: 'color: red;',
    };
    const html = Html.tagOpen('div', attributes) + Html.tagClose('div');
    expect(html).toBe('<div data-id="1" style="color: red;"></div>');
  });

  test('with child', () => {
    const html = Html.tagOpen('div') + 'lorem ipsum' + Html.tagClose('div');
    expect(html).toBe('<div>lorem ipsum</div>');
  });
});

describe('build form', () => {
  test('simple', () => {
    const html = Html.formOpen() + Html.formClose();
    expect(html).toBe('<form></form>');
  });

  test('with attributes', () => {
    const attributes = {
      method: 'post',
      action: 'https://www.forbestclients.com',
    };
    const html = Html.formOpen(attributes) + Html.formClose();
    expect(html).toBe('<form method="post" action="https://www.forbestclients.com"></form>');
  });

  test('with child', () => {
    const html = Html.formOpen() + Html.input({ type: 'text' }) + Html.formClose();
    expect(html).toBe('<form><input type="text" /></form>');
  });
});
