'use strict';

const BaseScraper = require('../helpers/BaseScraper');

/**
 * Class for scraping food.com
 * @extends BaseScraper
 */
class MyFoodAndFamilyScraper extends BaseScraper {
   constructor(url) {
      super(url, 'myfoodandfamily.com/recipe/');
   }

   scrape($) {
      this.defaultSetImage($);
      this.defaultSetDescription($);

      const tags = $("meta[name='keywords']").attr('content');

      this.recipe.tags = tags ? tags.split(',').map((t) => t.trim()) : [];

      const { ingredients, instructions, time } = this.recipe;
      this.recipe.name = $('.krRDPrecName').text();

      $('.krRDPIngreList').each((i, el) => {
         const item = $(el).text().replace(/\s\s+/g, ' ').trim();
         ingredients.push(item);
      });

      $('.krRecipeDirectionsDest').each((i, el) => {
         const step = $(el).text().replace(/\s\s+/g, '');
         instructions.push(step);
      });
      this.recipe.time.total = $('krRDPcookText').text();

      this.recipe.servings = $('.krRDPServingText').text();

      console.log(this.recipe);
   }
}

module.exports = MyFoodAndFamilyScraper;
