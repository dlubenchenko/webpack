import { Post } from '@models/Post'
import json from './assets/json.json'
import WebpackLogo from './assets/webpack-logo'
import './styles/styles.css'
import xml from './assets/data.xml'
import csv from './assets/data.csv'
import * as $ from 'jquery'
import './styles/less.less'
import './styles/scss.scss'
import './babel'

const post = new Post('Webpack Post Title', WebpackLogo)

$('pre').addClass('code').html(post.toString())

console.log('Post: ', post.toString())
console.log('Post: ', post)

console.log(json)
console.log(xml)
console.log(csv)
