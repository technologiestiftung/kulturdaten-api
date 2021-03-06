import Resource from 'App/Helpers/Api/Resource';
import { ValidationException, validator } from '@ioc:Adonis/Core/Validator';
import Env from '@ioc:Adonis/Core/Env';
import { defaultLanguage } from 'Config/app';
import { Languages } from 'App/Helpers/Languages';

export function withTranslations(query) {
  return query.preload('translations');
}

export function queryMedia(query) {
  return query.preload('translations').preload('renditions').preload('license');
}

export function findTranslation(translations, language?) {
  if (!language) {
    return translations[0];
  }

  return translations.find((translation) => {
    return translation.language === language;
  });
}

export async function publishable(
  instance,
  PublishableValidator,
  PublishableTranslationValidator?
) {
  const resource = new Resource(instance).boot().toObject();

  const errors = {};
  try {
    await validator.validate({
      schema: new PublishableValidator().schema,
      data: resource,
    });
  } catch (e) {
    if (e instanceof ValidationException) {
      Object.assign(errors, e.messages);
    } else {
      throw e;
    }
  }

  if (PublishableTranslationValidator) {
    let translations = resource.relations?.translations;
    // Use an empty object to validate against, to force the error
    // even if there is no german/default translation
    let defaultTranslation = { attributes: {} };
    if (translations) {
      defaultTranslation = translations.find((translation) => {
        return translation.attributes?.language === defaultLanguage;
      }) || { attributes: {} };
    }

    try {
      await validator.validate({
        schema: new PublishableTranslationValidator().schema,
        data: defaultTranslation,
      });
    } catch (e) {
      if (e instanceof ValidationException) {
        Object.assign(errors, e.messages);
      } else {
        throw e;
      }
    }
  }

  return Object.keys(errors).length ? errors : true;
}

export function absoluteUrl(route: string) {
  return new URL(route, Env.get('API_URL') as string).toString();
}

export function updateField(attributes, instance, key) {
  if (!attributes) {
    return;
  }

  const value = attributes[key];
  if (value === undefined) {
    return;
  }

  instance[key] = value;
}

export function transformCategorizationsForXls(categorizations) {
  function extractCategorizations(language) {
    let mainTypes = [];
    categorizations.find((categorization) => {
      const translation = categorization.relations.translations.find(
        (translation) => {
          return (
            translation.attributes &&
            translation.attributes.language === language
          );
        }
      );
      if (!translation) {
        return {};
      }
      mainTypes.push(translation.attributes.name);
    });

    if (!mainTypes.length) {
      return {};
    }

    return mainTypes.join(', ');
  }
  return {
    german: extractCategorizations(Languages.DE),
    english: extractCategorizations(Languages.EN),
  };
}

export function transformTranslationsForXls(translations) {
  function extractTranslation(language) {
    const translation = translations.find((translation) => {
      return translation.attributes.language === language;
    });

    if (!translation) {
      return {};
    }

    const attributes = translation.attributes;
    delete attributes.language;
    return attributes;
  }

  return {
    german: extractTranslation(Languages.DE),
    easyGerman: extractTranslation(Languages.DE_EASY),
    english: extractTranslation(Languages.EN),
  };
}
