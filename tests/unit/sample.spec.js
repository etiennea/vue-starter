// import { expect } from 'chai';
import { shallow } from '@vue/test-utils';
import AboutPage from '~/pages/AboutPage';

describe('AboutPage.vue', () => {
  it('render is OK', () => {
    const wrapper = shallow(AboutPage);
    // expect(wrapper.text()).to.include('About Page');
  });
});
