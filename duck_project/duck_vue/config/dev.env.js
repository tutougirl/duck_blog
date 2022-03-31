/*
 * @Author: he yan ying
 * @Date: 2021-05-16 13:55:55
 * @LastEditors: he yan ying
 * @LastEditTime: 2022-03-24 20:27:51
 * @Description: 
 */
'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
})
