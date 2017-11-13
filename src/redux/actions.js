import app, { types as appTypes } from './app/actions';
import components, { types as componentsTypes } from './components/actions';
import integration, { types as integrationTypes } from './integration/actions';

export const types = {
  app: appTypes,
  components: componentsTypes,
  integration: integrationTypes
}

export default {
  app,
  components,
  integration
}