module.exports = {
  async getFromBase(parent = [2],limit=6, join ){
    //var parent =[2]
    const knex = strapi.connections.default;
    var List =  JSON.parse(JSON.stringify(await knex('categories')
      .select( "categories.id",
        "title as title",
        "alias as url")
      .whereIn('category', parent)
      .andWhere('visible', 0)
      //.where('popular', true)
      .limit(limit)
    ));
    var chil = []

    for (const [key, item] of Object.entries(List)) {

      var URL = 'shop/catalog/' +item.url;

      if(typeof join != "undefined"){
        chil.push(Object.assign({
          title:item.title,
          url:URL,
          id:item.id
        }, join))
      }else{
        chil.push({
          title:item.title,
          url:URL,
          id:item.id
        })
      }

    }

    console.log(join)
    return chil
  },
  async level2(parent = [2],limit=6){
    var columns = []
    const Departments2 = await this.getFromBase(parent,limit)

    for (const [key, child2] of Object.entries(Departments2)) {
      columns.push({
        size: 3,
        links: [{
          title: child2.title,
          url: child2.url,
          children: await this.getFromBase([child2.id],6)
        }]
      })
    }
    return columns
  },
  async getDepartments(ctx){

    var childItem = []
    var columns = []
    var sepColumns = []

    const Departments = await this.getFromBase([2],12)
    for (const [key, child1] of Object.entries(Departments)) {

      var section = {

        submenu: {
          type: 'megamenu',
          menu: {
            size: 'xl',
            image: {
              ltr: '/images/megamenu/megamenu-1-ltr.jpg',
              rtl: '/images/megamenu/megamenu-1-rtl.jpg'
            },
            columns: await this.level2([child1.id],10)
          }
        }

      }


      childItem.push(Object.assign(child1, section))
    }
    //console.log(childItem)
    return childItem
    return [
      {
        title: 'Потужні інструменти',
        url: '/',
        submenu: {
          type: 'megamenu',
          menu: {
            size: 'xl',
            image: {
              ltr: '/images/megamenu/megamenu-1-ltr.jpg',
              rtl: '/images/megamenu/megamenu-1-rtl.jpg'
            },
            columns: [
              {
                size: 3,
                links: [
                  {
                    title: 'Power Tools',
                    url: '',
                    children: [
                      { title: 'Engravers', url: '' },
                      { title: 'Drills', url: '' },
                      { title: 'Wrenches', url: '' },
                      { title: 'Plumbing', url: '' },
                      { title: 'Wall Chaser', url: '' },
                      { title: 'Pneumatic Tools', url: '' },
                      { title: 'Milling Cutters', url: '' }
                    ]
                  },
                  { title: 'Workbenches', url: '' },
                  { title: 'Presses', url: '' },
                  { title: 'Spray Guns', url: '' },
                  { title: 'Riveters', url: '' }
                ]
              },
              {
                size: 3,
                links: [
                  {
                    title: 'Hand Tools',
                    url: '',
                    children: [
                      { title: 'Screwdrivers', url: '' },
                      { title: 'Handsaws', url: '' },
                      { title: 'Knives', url: '' },
                      { title: 'Axes', url: '' },
                      { title: 'Multitools', url: '' },
                      { title: 'Paint Tools', url: '' }
                    ]
                  },
                  {
                    title: 'Garden Equipment',
                    url: '',
                    children: [
                      { title: 'Motor Pumps', url: '' },
                      { title: 'Chainsaws', url: '' },
                      { title: 'Electric Saws', url: '' },
                      { title: 'Brush Cutters', url: '' }
                    ]
                  }
                ]
              },
              {
                size: 3,
                links: [
                  {
                    title: 'Machine Tools',
                    url: '',
                    children: [
                      { title: 'Thread Cutting', url: '' },
                      { title: 'Chip Blowers', url: '' },
                      { title: 'Sharpening Machines', url: '' },
                      { title: 'Pipe Cutters', url: '' },
                      { title: 'Slotting machines', url: '' },
                      { title: 'Lathes', url: '' }
                    ]
                  }
                ]
              },
              {
                size: 3,
                links: [
                  {
                    title: 'Instruments',
                    url: '',
                    children: [
                      { title: 'Welding Equipment', url: '' },
                      { title: 'Power Tools', url: '' },
                      { title: 'Hand Tools', url: '' },
                      { title: 'Measuring Tool', url: '' }
                    ]
                  }
                ]
              }
            ]
          }
        }
      },
      {
        title: 'Hand Tools',
        url: '',
        submenu: {
          type: 'megamenu',
          menu: {
            size: 'lg',
            image: {
              ltr: '/images/megamenu/megamenu-2-ltr.jpg',
              rtl: '/images/megamenu/megamenu-2-rtl.jpg'
            },
            columns: [
              {
                size: 4,
                links: [
                  {
                    title: 'Hand Tools',
                    url: '',
                    children: [
                      { title: 'Screwdrivers', url: '' },
                      { title: 'Handsaws', url: '' },
                      { title: 'Knives', url: '' },
                      { title: 'Axes', url: '' },
                      { title: 'Multitools', url: '' },
                      { title: 'Paint Tools', url: '' }
                    ]
                  },
                  {
                    title: 'Garden Equipment',
                    url: '',
                    children: [
                      { title: 'Motor Pumps', url: '' },
                      { title: 'Chainsaws', url: '' },
                      { title: 'Electric Saws', url: '' },
                      { title: 'Brush Cutters', url: '' }
                    ]
                  }
                ]
              },
              {
                size: 4,
                links: [
                  {
                    title: 'Machine Tools',
                    url: '',
                    children: [
                      { title: 'Thread Cutting', url: '' },
                      { title: 'Chip Blowers', url: '' },
                      { title: 'Sharpening Machines', url: '' },
                      { title: 'Pipe Cutters', url: '' },
                      { title: 'Slotting machines', url: '' },
                      { title: 'Lathes', url: '' }
                    ]
                  }
                ]
              },
              {
                size: 4,
                links: [
                  {
                    title: 'Instruments',
                    url: '',
                    children: [
                      { title: 'Welding Equipment', url: '' },
                      { title: 'Power Tools', url: '' },
                      { title: 'Hand Tools', url: '' },
                      { title: 'Measuring Tool', url: '' }
                    ]
                  }
                ]
              }
            ]
          }
        }
      },
      {
        title: 'Machine Tools',
        url: '',
        submenu: {
          type: 'megamenu',
          menu: {
            size: 'nl',
            image: {
              ltr: '/images/megamenu/megamenu-3-ltr.jpg',
              rtl: '/images/megamenu/megamenu-3-rtl.jpg'
            },
            columns: [
              {
                size: 6,
                links: [
                  {
                    title: 'Hand Tools',
                    url: '',
                    children: [
                      { title: 'Screwdrivers', url: '' },
                      { title: 'Handsaws', url: '' },
                      { title: 'Knives', url: '' },
                      { title: 'Axes', url: '' },
                      { title: 'Multitools', url: '' },
                      { title: 'Paint Tools', url: '' }
                    ]
                  },
                  {
                    title: 'Garden Equipment',
                    url: '',
                    children: [
                      { title: 'Motor Pumps', url: '' },
                      { title: 'Chainsaws', url: '' },
                      { title: 'Electric Saws', url: '' },
                      { title: 'Brush Cutters', url: '' }
                    ]
                  }
                ]
              },
              {
                size: 6,
                links: [
                  {
                    title: 'Instruments',
                    url: '',
                    children: [
                      { title: 'Welding Equipment', url: '' },
                      { title: 'Power Tools', url: '' },
                      { title: 'Hand Tools', url: '' },
                      { title: 'Measuring Tool', url: '' }
                    ]
                  }
                ]
              }
            ]
          }
        }
      },
      {
        title: 'Building Supplies',
        url: '',
        submenu: {
          type: 'megamenu',
          menu: {
            size: 'sm',
            columns: [
              {
                size: 12,
                links: [
                  {
                    title: 'Hand Tools',
                    url: '',
                    children: [
                      { title: 'Screwdrivers', url: '' },
                      { title: 'Handsaws', url: '' },
                      { title: 'Knives', url: '' },
                      { title: 'Axes', url: '' },
                      { title: 'Multitools', url: '' },
                      { title: 'Paint Tools', url: '' }
                    ]
                  },
                  {
                    title: 'Garden Equipment',
                    url: '',
                    children: [
                      { title: 'Motor Pumps', url: '' },
                      { title: 'Chainsaws', url: '' },
                      { title: 'Electric Saws', url: '' },
                      { title: 'Brush Cutters', url: '' }
                    ]
                  }
                ]
              }
            ]
          }
        }
      },
      {
        title: 'Electrical',
        url: '',
        submenu: {
          type: 'menu',
          menu: [
            {
              title: 'Soldering Equipment',
              url: '',
              children: [
                { title: 'Soldering Station', url: '' },
                { title: 'Soldering Dryers', url: '' },
                { title: 'Gas Soldering Iron', url: '' },
                { title: 'Electric Soldering Iron', url: '' }
              ]
            },
            { title: 'Light Bulbs', url: '' },
            { title: 'Batteries', url: '' },
            { title: 'Light Fixtures', url: '' },
            { title: 'Warm Floor', url: '' },
            { title: 'Generators', url: '' },
            { title: 'UPS', url: '' }
          ]
        }
      },
      { title: 'Power Machinery', url: '' },
      { title: 'Measurement', url: '' },
      { title: 'Clothes & PPE', url: '' },
      { title: 'Plumbing', url: '' },
      { title: 'Storage & Organization', url: '' },
      { title: 'Welding & Soldering', url: '' }
    ]
  }
}
