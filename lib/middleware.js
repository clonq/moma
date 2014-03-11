module.exports = middleware;

function middleware (req, res, next) {
	if (shouldProcess(req)) processRequest(req, res);
	next();
};

function shouldProcess(req) {
	return true
}

function processRequest(req, res) {
	throw new Error('notimplemented')
}