// ==UserScript==
// @name         e
// @match        https://online.transport.wa.gov.au/pdabooking/manage/wicket/page?*
// @require      https://code.jquery.com/jquery-3.7.1.min.js
// ==/UserScript==

/* eslint-disable no-multi-spaces, no-undef */

const _idsl = {
	id       : '[id^="id"]'                                                                    ,
	metipt   : 'input[name="searchBookingContainer:siteRegion"][id$="-METRO"]'                 ,
	regipt   : 'input[name="searchBookingContainer:siteRegion"][id$="-REGIONAL"]'              ,
	metol    : 'input[name="searchBookingContainer:siteRegion"][id$="-METRO"]:not(:checked)'   ,
	regol    : 'input[name="searchBookingContainer:siteRegion"][id$="-REGIONAL"]:not(:checked)',
	datefript: 'input#fromDateInput'                                                           ,
	datetoipt: 'input#toDateInput'                                                             ,
	subipt   : 'input[name|="searchBookingContainer:siteList"]'                                ,
	subol    : 'input[name|="searchBookingContainer:siteList"]:not(:checked)'                  ,
	srchipt  : 'input[name|="searchBookingContainer:search"]'                                  ,
	rstspn   : 'span#searchResultRadioLabel'                                                   ,
	subiflbl : 'label[for*="searchBookingContainer:siteList"]'                                 ,
	subifipt : 'input[name="searchBookingContainer:siteList"]'                                 ,
}

const _l = ['> %cp%cq', 'color: #007FFF', 'color: #FC88F7']

let ___   = false
let ____  = 0
let _____ = new Date ()

const _dms = 86400000

const _s = _ => _ * 1000
const _m = _ => _s (_) * 60

const _rp = _ => Math.random () * ((_ * 1.1) - (_ * 0.9)) + (_ * 1.1)

const _t  = _ => new Promise (r => setTimeout (r, _rp (_)))
const _ts = _ => _t (_s (_))
const _tm = _ => _t (_m (_))

const _dodate = a => a.getDate () + '/' + (a.getMonth () + 1) + '/' + a.getFullYear ()

const _datec = () => _dodate (new Date)
const _daten = () => _dodate (new Date ((new Date).getTime () + (_dms *   1)))
const _datee = () => _dodate (new Date ((new Date).getTime () + (_dms *  31)))

const log = (a, b) => (b === undefined) ? console.log (_l [0], _l [1], _l [2], '-', a) : console.log (_l [0], _l [1], _l [2], '-', a, ':', b)

const _shs = _ => !!($ (_)?.[0]) + ' | ' + $ (_)?.[0]?.checked
const _shl = (z) => (_, a) => log ('	' + z?.[_]?.innerText, a?.checked)
const _sha = (_, a) => log ('	ID', $ (a) [0]?.id)

const _pqhs = (_, a) => a?.click?.()
const _pqhr = (_, __) => '' + _ + ' | ' + ((new Date () - __) / 1000) + 's from last'

const _dopost = (a, _) => {
	const c = new XMLHttpRequest ()
		c.open             ('POST', 'https://discord.com/api/webhooks/')
		c.setRequestHeader ('Content-type', 'application/json')
		c.send             (_ ? a : JSON.stringify (a))
}

const _dch =  (e) => (_, c) => e.push ($ (c)?.[0]?.innerText?.trim?.() + '\n')

const _docont = a => {
	let b = {content: 'a'}

	let d = ''

	d += '> '
	d += (new Date ()).toLocaleTimeString ('en-AU')
	d += '\n```'

	let e = []

	if (a.length >= 1) a.each (_dch (e))
	else               e.push ('Nothing.')

	d += e.join ()

	if (d.match (/Kelmscott/)) d = '> <@>\n' + d

	if (d.length >= 1995) d = d.substring (0, 1900) + '```'
	else d += '```'

	b.content = d

	return b
}

const _pqorg = async () => {
	log ('Start')

	log ('Date', _datec () + ' | ' + _daten () + ' | ' + _datee ())

	log ('Available ID\'s')
	$ (_idsl.id).each (_sha)

	log ('Settings')
	log ('	Metro'   , _shs (_idsl.metipt))
	log ('	Regional', _shs (_idsl.regipt))

	log ('Suburbs')

	const z = $ (_idsl.subiflbl)
	$ (_idsl.subifipt).each (_shl (z))

	___ = true
	_pq ()
}

// eslint-disable-next-line no-implicit-globals
_pq = async () => {
	if (!___) return _pqorg ()

	$ (_idsl.metol)?.[0]?.click?.()

	await _t (500) // ~500

	$ (_idsl.datefript) [0].value = _daten ()
	$ (_idsl.datetoipt) [0].value = _datee ()

	await _t (50) // ~550

	$ (_idsl.subol).each (_pqhs)

	await _t (500) // ~1050

	$ (_idsl.srchipt)?.click?.()

	await _ts (10) // ~11050

	_dopost (_docont ($ (_idsl.rstspn)))

	await _tm (5) // ~191050

	____ += 1
	log ('Refresh', _pqhr (___, _____))

	_pq ()
}
